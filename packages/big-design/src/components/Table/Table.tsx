import React, { memo, useRef } from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Item } from './Item';

export const Table = memo(
  <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
    const { className, stickyHeader, style, data, columns, pagination, selectable, id, ...rest } = props;
    const tableIdRef = useRef(id || uniqueId('table_'));
    const isSelectable = Boolean(selectable);

    const renderHeaders = () => (
      <Head>
        <Item isSelectable={isSelectable}>
          {columns.map(({ header }, index) => (
            <Cell key={index}>{header}</Cell>
          ))}
        </Item>
      </Head>
    );

    const isRowSelected = (row: T) => {
      return selectable && selectable.selectedItems.includes(row);
    };

    const renderItems = () => (
      <Body>
        {data.map((item: T, index) => (
          <Item
            isSelectable={isSelectable}
            key={getKey(item, index)}
            onItemSelect={nextValue => handleRowSelect(item, nextValue)}
            selected={isRowSelected(item)}
          >
            {props.columns.map(({ Cell: CustomCell }, ind) => (
              <Cell key={ind}>
                <CustomCell {...item} />
              </Cell>
            ))}
          </Item>
        ))}
      </Body>
    );

    const handleRowSelect = (row: T, isSelected: boolean) => {
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

    const shouldRenderActions = () => {
      return Boolean(pagination) || Boolean(selectable);
    };

    return (
      <TableContext.Provider value={{ stickyHeader }}>
        {shouldRenderActions() && (
          <Actions pagination={pagination} selectable={selectable} items={data} tableId={tableIdRef.current} />
        )}
        <StyledTable id={tableIdRef.current} {...rest}>
          {renderHeaders()}
          {renderItems()}
        </StyledTable>
      </TableContext.Provider>
    );
  },
);

function getKey<T extends TableItem>({ id }: T, index: number): string | number {
  if (id !== undefined) {
    return id;
  }

  return index;
}

export const TableFigure: React.FC = memo(props => <StyledTableFigure {...props} />);
