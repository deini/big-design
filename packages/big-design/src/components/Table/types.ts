import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableCell {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  content: React.ReactNode;
  key?: string | number;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
}

export interface TableItem {
  cells: TableCell[];
  key?: string | number;
}

export interface TableSelectable {
  itemsName?: string;
  onSelectionChange: any; // puse any pq el example llora por ts
  selectedItems: TableItem[];
}

export type TablePagination = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  stickyHeader?: boolean;
  items: TableItem[];
  headers: TableCell[];
  pagination?: TablePagination;
  selectable?: TableSelectable;
}
