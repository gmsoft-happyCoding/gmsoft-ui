# GMSOFT-UI 组件库  

[![NPM](https://img.shields.io/npm/v/gmsoft-ui.svg)](https://www.npmjs.com/package/ui)
[![DOWNLOAD](https://img.shields.io/npm/dt/gmsoft-ui.svg)](https://www.npmjs.com/package/gmsoft-ui)
## install

```

  yarn add gmsoft-ui

```

## Modal 

> 解决渲染到top时，滚动条异常的问题

### Props  

| 属性               | 说明                                                | 类型                                                   | 默认值                  |  版本 |
| :----------------- | :-------------------------------------------------- | :----------------------------------------------------- | :---------------------- | ----: |
| getContainer       | 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| () => HTMLElement \| Selectors \| false | () => top.document.body | 1.0.1 |
| size               | 宽度方案                                            | 'small' \| 'default' \| 'large'                        | 'default'               | 1.0.0 |
| children           | 子级节点                                            | React.ReactNode                                        | -                       | 1.0.0 |
| ~~destroyOnClose~~ | 关闭时销毁 Modal 里的子元素                         | **作废**                                               | -                       | 1.0.0 |
### Context  

 - children 外用 Antd 的 ```ConfigProvider``` 包裹，配置的默认参数有：
    - getPopupContainer：triggerNode => triggerNode.parentNode  
    

## Drawer 

> 解决渲染到top时，滚动条异常的问题

### Props  

| 属性               | 说明                                                | 类型                                                   | 默认值                  |  版本 |
| :----------------- | :-------------------------------------------------- | :----------------------------------------------------- | :---------------------- | ----: |
| getContainer       | 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| () => HTMLElement \| Selectors \| false | () => top.document.body | 1.0.1 |
| size               | 宽度方案                                            | 'small' \| 'default' \| 'large'                        | 'default'               | 1.0.0 |
| children           | 子级节点                                            | React.ReactNode                                        | -                       | 1.0.0 |
| ~~destroyOnClose~~ | 关闭时销毁 Modal 里的子元素                         | **作废**                                               | -                       | 1.0.0 |
| onClickCapture     | 点击窗体（整个Drawer）回调                          | MouseEvent=>void                                       | -                       | 1.0.0 |
### Context  

 - children 外用 Antd 的 ```ConfigProvider``` 包裹，配置的默认参数有：
    - getPopupContainer：triggerNode => triggerNode.parentNode  
  

### popup function
如果 `top.eventBus` 存在
-- 通过 `top.eventBus.emit` 发送相应的事件
否则
-- 直接调用 `antd` 对应组件的 `function`

> api 和 antd 一致

```
message.info
message.success
message.error
message.warning
message.loading

Modal.info
Modal.success
Modal.error
Modal.warning
Modal.confirm

notification.info
notification.success
notification.error
notification.warning
```


## TableDescriptions

> 表格展示详情

### Props

| 属性       | 说明               | 类型                                          | 默认值                                                                     |  版本 |
| :--------- | :----------------- | :-------------------------------------------- | :------------------------------------------------------------------------- | ----: |
| dataSource | 数据数组           | TDRecod[] \| undefined                        | 1.0.1                                                                      |
| size       | 宽度方案           | 'default' \| 'middle' \| 'small' \| undefined | 'default'                                                                  | 1.0.0 |
| alignConf  | 文本、内容对齐配置 | AlignConf \|undefined                         | {labelAlign:'right',labelValign:'top',valueAlign:'left',valueValign:'top'} | 1.0.0 |
| title      | 标题               | ReactNode \| undefined                        | undefined                                                                  | 1.0.0 |
| loading    | 加载中             | boolean \| undefined                          | undefined                                                                  | 1.0.0 |



```typescript

interface AlignConf {
  /**
   * label 标签的文本 水平对齐方式
   * @default 'right'
   */
  labelAlign?: Aligin;
  /**
   * label 标签的文本 竖直对齐方式
   * @default 'top'
   */
  labelValign?: Valigin;
  /**
   * value 内容的文本 水平对齐方式
   * @default 'left'
   */
  valueAlign?: Aligin;
  /**
   * value 内容的文本 竖直对齐方式
   * @default 'top'
   */
  valueValign?: Valigin;
}

interface TDRecod {
  /**
   * 标签
   * * 若传入undefined|null 则不显示
   */
  label: ReactNode;
  /**
   * 内容
   * * 若传入undefined|null 则不显示
   */
  value: ReactNode;
  /**
   * 布局
   * @default { label: 3; value: 5 }
   * * 传入 number 时 将 配置为 { label: 3; value: colspan - 3 }，故colspan必须大于 3 小于24
   */
  colspan?: number | { label: number; value: number };
  /**
   * 文本、内容对齐配置
   * * 若不传入则取组件props配置
   * * 若传入则优先取本值
   */
  alignConf?: AlignConf;
}

```


## 更新日志  


- ### 1.3.0 
  2020-3-16
  - 🌟 新增 Empty, 展示空
  - 🌟 新增 TableDescriptions, 表格形式展示详情
- ### 1.2.4 
  2020-3-11
  - 🐞 getTopRoot 默认选中元素改为 #mount-root
- ### 1.2.1 
  2020-1-10
  - 🌟 新增 popup function, 提示弹层的调用对应用透明
- ### 1.1.0  
  2020-1-7
  调试  
- ### 1.0.1  
  2020-1-7      
  - 🌟 ```Drawer```、```Modal```，新增 ```getContainer```