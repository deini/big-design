import React, { memo, useRef } from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableCell, TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Item } from './Item';

export const Table: React.FC<TableProps> = memo(props => {
  const { className, stickyHeader, style, items, headers, pagination, selectable, id, ...rest } = props;
  const tableIdRef = useRef(id || uniqueId('table_'));
  const isSelectable = Boolean(selectable);

  const renderHeaders = () => (
    <Head>
      <Item isSelectable={isSelectable}>
        {headers.map((header, index) => (
          <Cell key={getKey(header.key, index)}>{header.content}</Cell>
        ))}
      </Item>
    </Head>
  );

  const isRowSelected = (row: TableItem) => {
    return selectable && selectable.selectedItems.includes(row);
  };

  const renderItems = () => (
    <Body>
      {items.map((row, rowIndex) => (
        <Item
          isSelectable={isSelectable}
          key={getKey(row.key, rowIndex)}
          onItemSelect={nextValue => handleRowSelect(row, nextValue)}
          selected={isRowSelected(row)}
        >
          {renderCells(row.cells)}
        </Item>
      ))}
    </Body>
  );

  const renderCells = (cells: TableCell[] = []) => {
    return cells.map((cell, cellIndex) => <Cell key={getKey(cell.key, cellIndex)}>{cell.content}</Cell>);
  };

  const handleRowSelect = (row: TableItem, isSelected: boolean) => {
    if (!selectable) {
      return;
    }

    const { selectedItems, onSelectionChange } = selectable;

    if (isSelected) {
      onSelectionChange([...selectedItems, row]);
    } else {
      onSelectionChange(selectedItems.filter(item => item !== row));
    }
  };

  return (
    <TableContext.Provider value={{ stickyHeader }}>
      <Actions pagination={pagination} selectable={selectable} items={items} tableId={tableIdRef.current} />
      <StyledTable id={tableIdRef.current} {...rest}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>
    </TableContext.Provider>
  );
});

const getKey = (key: string | number | undefined, fallbackKey: number): string | number => {
  return key === undefined ? fallbackKey : key;
};

export const TableFigure: React.FC<any> = ({ className, style, ...props }) => <StyledTableFigure {...props} />;
