/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';

export const Tbody = styled.tbody<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
>``;
export const Thead = styled.thead<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
>`
  display: none;
`;
export const Tr = styled.tr<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
>`
  border-bottom: 1px solid #e8e8e8;
`;

export const Label = styled.td`
  border-right: 1px solid #e8e8e8;
  text-align: ${props => props.align};
  vertical-align: ${props => props.valign};
  background-color: #fafafa;
`;

export const Value = styled.td`
  border-right: 1px solid #e8e8e8;
  text-align: ${props => props.align};
  vertical-align: ${props => props.valign};
`;

export const Th = styled.th<
  React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
>``;

export const Table = styled.table<
  React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
    size: 'default' | 'middle' | 'small';
  }
>`
  width: 100%;
  table-layout: fixed;
  & tr:last-child {
    border-bottom: none;
  }
  & tr td:last-child,
  & tr th:last-child {
    border-right: none;
  }
  & tr td,
  & tr th {
    padding: ${props => {
      if (props.size === 'middle') {
        return '12px 24px';
      }
      if (props.size === 'small') {
        return '8px 16px';
      }
      return '16px 24px';
    }};
  }
`;

export const TableDesTitle = styled.div`
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  line-height: 1.5;
`;
export const TableDesView = styled.div`
  border: 1px solid #e8e8e8;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
`;
