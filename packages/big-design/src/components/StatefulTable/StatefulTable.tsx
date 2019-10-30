import React, { useEffect, useMemo, useReducer } from 'react';

import { typedMemo } from '../../utils';
import { Table, TableColumn, TableItem, TableProps, TableSortDirection } from '../Table';

import { createReducer } from './reducer';

export interface StatefulTableColumn<T> extends TableColumn<T> {
  sortKey?: keyof T;
}

export interface StatefulTableProps<T>
  extends Omit<TableProps<T>, 'columns' | 'pagination' | 'selectable' | 'sortable'> {
  columns: Array<StatefulTableColumn<T>>;
  pagination?: boolean;
  selectable?: boolean;
}

const InternalStatefulTable = <T extends TableItem>(
  props: StatefulTableProps<T>,
): React.ReactElement<StatefulTableProps<T>> => {
  const { columns, itemName, items, keyField, pagination = true, selectable = true, stickyHeader } = props;

  const reducer = useMemo(() => createReducer<T>(), []);
  const sortable = useMemo(() => columns.some(column => column.isSortable), [columns]);

  // todo maybe move all this and use state initializer lazy
  const [state, dispatch] = useReducer(reducer, {
    currentItems: [],
    isPaginationEnabled: pagination,
    items,
    pagination: {
      currentPage: 1,
      itemsPerPage: 5,
      itemsPerPageOptions: [25, 50, 100, 250],
      totalItems: items.length,
    },
    selectedItems: [],
    sortable: {
      direction: 'ASC',
    },
  });

  useEffect(() => dispatch({ type: 'ITEMS_CHANGED', payload: { items, isPaginationEnabled: pagination } }), [
    items,
    pagination,
  ]);

  const onPageChange = (page: number) => dispatch({ type: 'PAGE_CHANGE', page });
  const onItemsPerPageChange = (itemsPerPage: number) => dispatch({ type: 'ITEMS_PER_PAGE_CHANGE', itemsPerPage });
  const onSelectionChange = (selectedItems: T[]) => dispatch({ type: 'SELECTED_ITEMS', selectedItems });

  const onSort = (columnHash: string, direction: TableSortDirection, column: StatefulTableColumn<T>) => {
    if (column.sortKey === undefined) {
      return;
    }

    dispatch({
      type: 'SORT',
      payload: {
        columnHash,
        direction,
        sortKey: column.sortKey,
      },
    });
  };

  const paginationOptions = pagination ? { ...state.pagination, onItemsPerPageChange, onPageChange } : undefined;
  const selectableOptions = selectable ? { selectedItems: state.selectedItems, onSelectionChange } : undefined;
  const sortableOptions = sortable ? { ...state.sortable, onSort } : undefined;

  return (
    <Table
      columns={columns}
      itemName={itemName}
      items={state.currentItems}
      keyField={keyField}
      stickyHeader={stickyHeader}
      pagination={paginationOptions}
      selectable={selectableOptions}
      sortable={sortableOptions}
    />
  );
};

export const StatefulTable = typedMemo(InternalStatefulTable);
