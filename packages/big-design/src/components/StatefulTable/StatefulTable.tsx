import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { typedMemo } from '../../utils';
import { Table, TableColumn, TableItem, TableProps, TableSortDirection } from '../Table';

import { createReducer, createReducerInit } from './reducer';

export interface StatefulTableColumn<T> extends Omit<TableColumn<T>, 'isSortable'> {
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
  const reducerInit = useMemo(() => createReducerInit<T>(), []);
  const sortable = useMemo(() => columns.some(column => column.sortKey), [columns]);

  const [state, dispatch] = useReducer(reducer, { columns, items, pagination }, reducerInit);

  useEffect(() => dispatch({ type: 'COLUMNS_CHANGED', columns }), [columns]);
  useEffect(() => dispatch({ type: 'ITEMS_CHANGED', payload: { items, isPaginationEnabled: pagination } }), [
    items,
    pagination,
  ]);

  const onPageChange = useCallback((page: number) => dispatch({ type: 'PAGE_CHANGE', page }), []);
  const onItemsPerPageChange = useCallback(
    (itemsPerPage: number) => dispatch({ type: 'ITEMS_PER_PAGE_CHANGE', itemsPerPage }),
    [],
  );
  const onSelectionChange = useCallback(
    (selectedItems: T[]) => dispatch({ type: 'SELECTED_ITEMS', selectedItems }),
    [],
  );

  const onSort = useCallback((columnHash: string, direction: TableSortDirection, column: StatefulTableColumn<T>) => {
    if (column.sortKey === undefined) {
      return;
    }

    const payload = { columnHash, direction, sortKey: column.sortKey };

    dispatch({ type: 'SORT', payload });
  }, []);

  const paginationOptions = useMemo(
    () => (pagination ? { ...state.pagination, onItemsPerPageChange, onPageChange } : undefined),
    [pagination, state.pagination, onItemsPerPageChange, onPageChange],
  );

  const selectableOptions = useMemo(
    () => (selectable ? { selectedItems: state.selectedItems, onSelectionChange } : undefined),
    [selectable, state.selectedItems, onSelectionChange],
  );

  const sortableOptions = useMemo(() => (sortable ? { ...state.sortable, onSort } : undefined), [
    sortable,
    state.sortable,
    onSort,
  ]);

  return (
    <Table
      columns={state.columns}
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
