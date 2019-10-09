import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableCell {
  colSpan?: number;
  content: React.ReactNode;
  key?: string | number;
}

export interface TableRow {
  cells: TableCell[];
  key?: string | number;
}

export interface TableHeaders {
  colSpan?: number;
  content: React.ReactNode;
  key?: string | number;
}

export interface TableSelectable {
  selectedItems: TableRow[];
  onSelectionChange: any; // puse any pq el example llora por ts
}

export type TablePagination = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  stickyHeader?: boolean;
  rows: TableRow[];
  headers: TableHeaders[];
  pagination?: TablePagination;
  selectable?: TableSelectable;
}
