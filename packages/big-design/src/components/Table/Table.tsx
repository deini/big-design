import React, { memo } from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableCell, TableProps, TableRow } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Row } from './Row';

export const Table: React.FC<TableProps> = memo(props => {
  const { className, stickyHeader, style, rows, headers, pagination, selectable, id, ...rest } = props;
  const tableId = id || uniqueId('table_');
  const isSelectable = Boolean(selectable);

  const renderHeaders = () => (
    <Head>
      <Row isSelectable={isSelectable}>
        {headers.map((header, index) => (
          <Cell key={getKey(header.key, index)}>{header.content}</Cell>
        ))}
      </Row>
    </Head>
  );

  const isRowSelected = (row: TableRow) => {
    return selectable && selectable.selectedItems.includes(row);
  };

  const renderRows = () => (
    <Body>
      {rows.map((row, rowIndex) => (
        <Row
          isSelectable={isSelectable}
          key={getKey(row.key, rowIndex)}
          onRowSelect={nextValue => handleRowSelect(row, nextValue)}
          selected={isRowSelected(row)}
        >
          {renderCells(row.cells)}
        </Row>
      ))}
    </Body>
  );

  const renderCells = (cells: TableCell[] = []) => {
    return cells.map((cell, cellIndex) => <Cell key={getKey(cell.key, cellIndex)}>{cell.content}</Cell>);
  };

  const handleRowSelect = (row: TableRow, isSelected: boolean) => {
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
    <TableContext.Provider value={{ stickyHeader, tableId }}>
      <Actions pagination={pagination} selectable={selectable} rows={rows} />
      <StyledTable id={tableId} {...rest}>
        {renderHeaders()}
        {renderRows()}
      </StyledTable>
    </TableContext.Provider>
  );
});

const getKey = (key: string | number | undefined, fallbackKey: number): string | number => {
  return key === undefined ? fallbackKey : key;
};

export const TableFigure: React.FC<any> = ({ className, style, ...props }) => <StyledTableFigure {...props} />;
