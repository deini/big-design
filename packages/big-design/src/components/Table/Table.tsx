import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { MarginProps } from '../../mixins';
import { typedMemo, uniqueId } from '../../utils';
import { useEventCallback } from '../../utils/useEventCallback';

import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { HeaderCheckboxCell } from './HeaderCell/HeaderCell';
import { Row } from './Row';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    className,
    columns,
    id,
    itemName,
    items,
    keyField = 'id',
    pagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    ...rest
  } = props;
  const tableIdRef = useRef(id || uniqueId('table_'));
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());

  useEffect(() => {
    if (selectable) {
      setSelectedItems(new Set(selectable.selectedItems));
    }
  }, [selectable ? selectable.selectedItems : null]);

  const onItemSelect = selectable
    ? useEventCallback(
        (item: T) => {
          if (!selectable || !item) {
            return;
          }

          const { onSelectionChange } = selectable;
          const nextIsSelected = !selectedItems.has(item);

          if (nextIsSelected) {
            onSelectionChange([...selectedItems, item]);
          } else {
            onSelectionChange([...selectedItems].filter(selectedItem => selectedItem !== item));
          }
        },
        [selectedItems],
      )
    : undefined;

  const onSortClick = useCallback(
    (column: TableColumn<T>) => {
      if (!sortable || !column.isSortable) {
        return;
      }

      const { hash } = column;
      const sortDirection = sortable.direction === 'ASC' ? 'DESC' : 'ASC';

      if (typeof sortable.onSort === 'function') {
        sortable.onSort(hash, sortDirection, column);
      }
    },
    [sortable],
  );

  const shouldRenderActions = () => {
    return Boolean(pagination) || Boolean(selectable) || Boolean(itemName);
  };

  const getItemKey = (item: T, index: number): string | number => {
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  const renderHeaders = () => (
    <Head>
      <tr>
        {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} />}

        {columns.map((column, index) => {
          const { hash, header, isSortable } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;

          return (
            <HeaderCell
              column={column}
              isSorted={isSorted}
              key={index}
              onSortClick={onSortClick}
              sortDirection={sortDirection}
              stickyHeader={stickyHeader}
            >
              {header}
            </HeaderCell>
          );
        })}
      </tr>
    </Head>
  );

  const renderItems = () => (
    <Body>
      {items.map((item: T, index) => {
        const key = getItemKey(item, index);
        const isSelected = selectedItems.has(item);

        return (
          <Row
            columns={columns}
            isSelectable={isSelectable}
            isSelected={isSelected}
            item={item}
            key={key}
            onItemSelect={onItemSelect}
          />
        );
      })}
    </Body>
  );

  return (
    <>
      {shouldRenderActions() && (
        <Actions
          pagination={pagination}
          onSelectionChange={selectable && selectable.onSelectionChange}
          selectedItems={selectedItems}
          items={items}
          itemName={itemName}
          tableId={tableIdRef.current}
        />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>
    </>
  );
};

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC<MarginProps> = memo(props => <StyledTableFigure {...props} />);
