import { Reducer } from 'react';

import { TableSortDirection } from '../Table';

import { StatefulTableColumn } from './StatefulTable';

interface State<T> {
  currentItems: any[];
  columns: Array<StatefulTableColumn<T> & { isSortable: boolean }>;
  isPaginationEnabled: boolean;
  items: T[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    itemsPerPageOptions: number[];
    totalItems: number;
  };
  selectedItems: T[];
  sortable: {
    direction: TableSortDirection;
    columnHash?: string;
  };
}

const getItems = (
  items: any[],
  isPaginationEnabled: boolean,
  paginationOptions: { currentPage: number; itemsPerPage: number },
) => {
  if (!isPaginationEnabled) {
    return items;
  }

  const maxItems = paginationOptions.currentPage * paginationOptions.itemsPerPage;
  const lastItem = Math.min(maxItems, items.length);
  const firstItem = Math.max(0, maxItems - paginationOptions.itemsPerPage);

  return items.slice(firstItem, lastItem);
};

export type Action<T> =
  | { type: 'ITEMS_CHANGED'; payload: { items: T[]; isPaginationEnabled: boolean } }
  | { type: 'PAGE_CHANGE'; page: number }
  | { type: 'COLUMNS_CHANGED'; columns: Array<StatefulTableColumn<T>> }
  | { type: 'ITEMS_PER_PAGE_CHANGE'; itemsPerPage: number }
  | { type: 'SELECTED_ITEMS'; selectedItems: T[] }
  | { type: 'SORT'; payload: { direction: TableSortDirection; columnHash: string; sortKey: keyof T } };

// export const reducer: Reducer<State, Action> = (state, action) => {

export const createReducer = <T>(): Reducer<State<T>, Action<T>> => (state, action) => {
  // tslint:disable-next-line: no-console
  console.group('Action');
  // tslint:disable-next-line: no-console
  console.log(action);
  // tslint:disable-next-line: no-console
  console.groupEnd();

  switch (action.type) {
    case 'COLUMNS_CHANGED': {
      const columns = action.columns;

      return {
        ...state,
        columns: columns.map(column => ({ ...column, isSortable: Boolean(column.sortKey) })),
      };
    }

    case 'ITEMS_CHANGED': {
      const currentPage = 1;
      const items = action.payload.items;
      const isPaginationEnabled = action.payload.isPaginationEnabled;

      const currentItems = getItems(items, isPaginationEnabled, {
        currentPage,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        isPaginationEnabled,
        items,
        pagination: {
          ...state.pagination,
          currentPage,
          totalItems: items.length,
        },
        sortable: {
          direction: state.sortable.direction,
        },
      };
    }

    case 'PAGE_CHANGE': {
      const currentPage = action.page;
      const currentItems = getItems(state.items, true, {
        currentPage,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        pagination: {
          ...state.pagination,
          currentPage,
        },
      };
    }

    case 'ITEMS_PER_PAGE_CHANGE': {
      const currentPage = 1;
      const itemsPerPage = action.itemsPerPage;
      const currentItems = getItems(state.items, true, {
        currentPage,
        itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        pagination: {
          ...state.pagination,
          currentPage,
          itemsPerPage,
        },
      };
    }

    case 'SELECTED_ITEMS': {
      return {
        ...state,
        selectedItems: action.selectedItems,
      };
    }

    case 'SORT': {
      const direction = action.payload.direction;
      const columnHash = action.payload.columnHash;
      const sortKey = action.payload.sortKey;
      const items = sort(state.items, direction, sortKey);

      const currentItems = getItems(items, state.isPaginationEnabled, {
        currentPage: 1,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        items,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
        sortable: {
          direction,
          columnHash,
        },
      };
    }

    default:
      return state;
  }
};

function sort<T>(items: T[], direction: TableSortDirection, sortKey: keyof T) {
  return items
    .concat()
    .sort((a, b) => (direction === 'ASC' ? (a[sortKey] >= b[sortKey] ? 1 : -1) : a[sortKey] <= b[sortKey] ? 1 : -1));
}
