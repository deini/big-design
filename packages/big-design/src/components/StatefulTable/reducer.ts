import { Reducer } from 'react';

import { TableSortDirection } from '../Table';

import { StatefulTableColumn } from './StatefulTable';

interface State<T> {
  currentItems: T[];
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

interface InitArgs<T> {
  columns: Array<StatefulTableColumn<T>>;
  defaultSelected: T[];
  items: T[];
  pagination: boolean;
}

export const createReducerInit = <T>() => ({ columns, defaultSelected, items, pagination }: InitArgs<T>): State<T> => {
  const currentPage = 1;
  const itemsPerPage = 25;
  const currentItems = getItems(items, pagination, { currentPage, itemsPerPage });

  return {
    currentItems,
    columns: augmentColumns(columns),
    isPaginationEnabled: pagination,
    items,
    pagination: {
      currentPage,
      itemsPerPage,
      itemsPerPageOptions: [25, 50, 100, 250],
      totalItems: items.length,
    },
    selectedItems: defaultSelected,
    sortable: {
      direction: 'ASC',
    },
  };
};

export type Action<T> =
  | { type: 'COLUMNS_CHANGED'; columns: Array<StatefulTableColumn<T>> }
  | { type: 'ITEMS_CHANGED'; items: T[]; isPaginationEnabled: boolean }
  | { type: 'ITEMS_PER_PAGE_CHANGE'; itemsPerPage: number }
  | { type: 'PAGE_CHANGE'; page: number }
  | { type: 'SELECTED_ITEMS'; selectedItems: T[] }
  | { type: 'SORT'; direction: TableSortDirection; columnHash: string; sortKey?: keyof T };

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
        columns: augmentColumns(columns),
      };
    }

    case 'ITEMS_CHANGED': {
      const currentPage = 1;
      const items = action.items;
      const isPaginationEnabled = action.isPaginationEnabled;

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
      return { ...state, selectedItems: action.selectedItems };
    }

    case 'SORT': {
      const sortKey = action.sortKey;
      const direction = action.direction;
      const columnHash = action.columnHash;

      if (!sortKey) {
        return state;
      }

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

function augmentColumns<T>(columns: Array<StatefulTableColumn<T>>) {
  return columns.map(column => ({ ...column, isSortable: Boolean(column.sortKey) }));
}

function getItems<T>(
  items: T[],
  isPaginationEnabled: boolean,
  paginationOptions: { currentPage: number; itemsPerPage: number },
) {
  if (!isPaginationEnabled) {
    return items;
  }

  const maxItems = paginationOptions.currentPage * paginationOptions.itemsPerPage;
  const lastItem = Math.min(maxItems, items.length);
  const firstItem = Math.max(0, maxItems - paginationOptions.itemsPerPage);

  return items.slice(firstItem, lastItem);
}

function sort<T>(items: T[], direction: TableSortDirection, sortKey: keyof T) {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = firstItem[sortKey];
    const secondValue = secondItem[sortKey];

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return direction === 'ASC' ? firstValue - secondValue : secondValue - firstValue;
    }

    const firstValueString = String(firstValue);
    const secondValueString = String(secondValue);

    return direction === 'ASC'
      ? firstValueString.localeCompare(secondValueString)
      : secondValueString.localeCompare(firstValueString);
  });
}
