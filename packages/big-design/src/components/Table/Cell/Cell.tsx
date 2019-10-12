import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../types';

import { StyledTableCell, StyledTableHeader } from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement>, Omit<TableCell, 'content'> {
  isCheckbox?: boolean;
}

export const Cell: React.FC<CellProps> = ({ children, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const isTextContent = typeof children === 'string';

  if (tableSectionContext === 'thead') {
    return isTextContent ? (
      <StyledTableHeader stickyHeader={tableContext.stickyHeader} {...props}>
        {children}
      </StyledTableHeader>
    ) : (
      <th {...props}>{children}</th>
    );
  }

  return isTextContent ? <StyledTableCell {...props}>{children}</StyledTableCell> : <td {...props}>{children}</td>;
};
