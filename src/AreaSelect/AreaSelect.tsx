import React, { useState, useEffect, useCallback } from 'react';
import { Cascader } from 'antd';
import { get, remove } from 'lodash';
import styled from 'styled-components';
import axios from 'axios';
import { ApiI, AreaI, WithPathOpts } from './typing';
import convertRESTAPI from '../utils/convertRESTAPI';

/**
 * 兼容新老接口
 * 老的数据返回为 data.data
 */
function compatibility(data: any) {
  return data.data || data || [];
}


const Wrap = styled.div`
  & .ant-cascader-menu {
    height: 300px;
  }
`;

enum LEVEL {
  MUN_PROVINCE = 1, // 区域级别:省
  MUN_CITY = 2, // 区域级别:直辖市, 直辖市下没有地级市, 直接下级为区, 县
  MUN_DISTRICT = 3, // 区域级别:自治区
  CITY = 4, // 区域级别:地级市
  COUNTY = 5, // 区域级别:区、县
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  type: LEVEL;
  isLeaf: boolean;
  children?: Option[];
}

function transform(data) {
  return data.map(district => ({
    value: district.id,
    label: district.name,
    type: district.type,
    isLeaf: district.type === 5,
  }));
}

interface Props {
  /**
   * api方法, 接受参数 { path: { id: string }, cache:boolean }
   * 或请求url, 包含路径参数 {id}
   */
  api: ApiI | string;
  value?: AreaI;
  onChange?: (value: AreaI) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export default React.forwardRef<any, Props>(
  ({ api, value, onChange, getPopupContainer }: Props, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [innerValue, setInnerValue] = useState<string[]>([]);

    const loadApi = useCallback(
      (config: WithPathOpts) => {
        if (typeof api === 'string') {
          return axios.get(convertRESTAPI(api, config), config);
        }
        return api(config);
      },
      [api]
    );

    /**
     * 动态加载下级数据
     */
    const loadData = useCallback(
      selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        loadApi({ path: { id: targetOption.value }, cache: true }).then(({ data }) => {
          targetOption.loading = false;

          if (compatibility(data) && compatibility(data).length > 0) {
            targetOption.children = transform(compatibility(data));
          } else {
            targetOption.isLeaf = true;
          }
          setOptions([...options]);
        });
      },
      [loadApi, options]
    );

    /**
     * 初始化加载省级数据
     * 因为重庆最常用, 所以移到最前端
     */
    useEffect(() => {
      loadApi({ path: { id: '0' }, cache: true }).then(({ data }) => {
        /
        const provinceOptions = transform(compatibility(data));
        const chongqing = remove(provinceOptions, (o: Option) => o.label.includes('重庆'));
        provinceOptions.unshift(...chongqing);
        setOptions(provinceOptions);
      });
    }, [loadApi]);

    useEffect(() => {
      setInnerValue(
        [get(value, 'province.id'), get(value, 'city.id'), get(value, 'county.id')].filter(Boolean)
      );
    }, [value]);

    const selectChange = (v: string[], selectedOptions) => {
      setInnerValue(v);
      if (onChange) {
        onChange(
          selectedOptions.reduce((area: AreaI, option: Option) => {
            const idAndName = {
              id: option.value,
              name: option.label,
            };
            switch (option.type) {
              case LEVEL.MUN_PROVINCE:
              case LEVEL.MUN_DISTRICT:
              case LEVEL.MUN_CITY:
                area.province = idAndName;
                break;
              case LEVEL.CITY:
                area.city = idAndName;
                break;
              case LEVEL.COUNTY:
                area.county = idAndName;
                break;
              default:
                break;
            }
            return area;
          }, {})
        );
      }
    };

    return (
      <Wrap>
        <Cascader
          placeholder="请选择地区"
          notFoundContent="数据加载中..."
          ref={ref}
          value={innerValue}
          options={options}
          loadData={loadData}
          onChange={selectChange}
          getPopupContainer={getPopupContainer}
          changeOnSelect
        />
      </Wrap>
    );
  }
);
