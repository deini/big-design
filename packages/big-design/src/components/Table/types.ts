import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableSelectable<T> {
  itemsName?: string;
  selectedItems: T[];
  onSelectionChange(selectedItems: T[]): void;
}

export interface TableItem {
  id?: string | number;
  [key: string]: any;
}

export interface TableColumn<T> {
  render: React.ComponentType<T>;
  align?: 'left' | 'center' | 'right';
  header: string | React.ReactNode;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
}

export type TablePagination = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: Array<TableColumn<T>>;
  items: T[];
  pagination?: TablePagination;
  selectable?: TableSelectable<T>;
  stickyHeader?: boolean;
  withPadding?: boolean;
}
