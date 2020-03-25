import * as React from 'react';

import { Colors, Icon, IHTMLTableProps } from '@blueprintjs/core';
import { Column, useSortBy, useTable } from 'react-table';

import { BaseTable, TH } from './styled';

export type TableColumns<T extends object> = Column<T>[];

export type TableProps<T extends object> = {
  columns: TableColumns<T>;
  data: T[];
} & IHTMLTableProps;

const TableMemo: React.FC<TableProps<any>> = (props) => {
  const { columns, data, ...tableProps } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  return (
    <BaseTable {...tableProps} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <TH key={i} {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {(column as any).isSorted ? (
                    <Icon color={Colors.GRAY4} icon={(column as any).isSortedDesc ? 'caret-up' : 'caret-down'} />
                  ) : (
                    ''
                  )}
                </span>
              </TH>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </BaseTable>
  );
};

export const Table = React.memo(TableMemo);

export default Table;
