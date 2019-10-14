import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableSelectable<T> {
  itemsName?: string;
  selectedItems: T[];
  onSelectionChange(selectedItems: T[]): void;
}

export interface TableItem {
  id?: string | number;
  // [key: string]: any;
}

export interface TableColumn<T> {
  Cell: React.ComponentType<T>;
  align?: 'left' | 'center' | 'right';
  header: string | React.ReactNode;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
}

export type TablePagination = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps<T extends TableItem> extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: Array<TableColumn<T>>;
  data: T[];
  pagination?: TablePagination;
  selectable?: TableSelectable<T>;
  stickyHeader?: boolean;
}
