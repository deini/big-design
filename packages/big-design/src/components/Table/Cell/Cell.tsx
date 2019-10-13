import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../types';

import { StyledTableCell, StyledTableHeader, StyledVanillaTd, StyledVanillaTh } from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement>, Omit<TableCell, 'content'> {
  isCheckbox?: boolean;
}

export const Cell: React.FC<CellProps> = ({ children, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const renderStyledCell = typeof children === 'string' || props.isCheckbox;

  if (tableSectionContext === 'thead') {
    return renderStyledCell ? (
      <StyledTableHeader stickyHeader={tableContext.stickyHeader} {...props}>
        {children}
      </StyledTableHeader>
    ) : (
      <StyledVanillaTh {...props}>{children}</StyledVanillaTh>
    );
  }

  return renderStyledCell ? (
    <StyledTableCell {...props}>{children}</StyledTableCell>
  ) : (
    <StyledVanillaTd {...props}>{children}</StyledVanillaTd>
  );
};
