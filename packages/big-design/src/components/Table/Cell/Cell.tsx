import React, { memo, useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../types';

import {
  StyledCustomTableCell,
  StyledCustomTableHead,
  StyledDefaultTableCell,
  StyledDefaultTableHeader,
} from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement>, Omit<TableCell, 'content'> {
  isCheckbox?: boolean;
}

export const Cell: React.FC<CellProps> = memo(({ children, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const renderDefaultCell = typeof children === 'string' || typeof children === 'number' || props.isCheckbox;

  const renderHeader = () => {
    return renderDefaultCell ? (
      <StyledDefaultTableHeader stickyHeader={tableContext.stickyHeader} {...props}>
        {children}
      </StyledDefaultTableHeader>
    ) : (
      <StyledCustomTableHead {...props}>{children}</StyledCustomTableHead>
    );
  };

  const renderData = () => {
    return renderDefaultCell ? (
      <StyledDefaultTableCell {...props}>{children}</StyledDefaultTableCell>
    ) : (
      <StyledCustomTableCell {...props}>{children}</StyledCustomTableCell>
    );
  };

  return tableSectionContext === 'thead' ? renderHeader() : renderData();
});
