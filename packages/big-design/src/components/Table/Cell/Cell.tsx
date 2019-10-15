import React, { memo, useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';

import { StyledTableData, StyledTableHeader } from './styled';

export interface CellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
  withPadding?: boolean;
}

export const Cell: React.FC<CellProps> = memo(
  ({ align, children, isCheckbox, verticalAlign, width, withPadding = true }: CellProps) => {
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const renderHeader = () => {
      return (
        <StyledTableHeader stickyHeader={tableContext.stickyHeader} align={align} isCheckbox={isCheckbox} width={width}>
          {children}
        </StyledTableHeader>
      );
    };

    const renderData = () => {
      return (
        <StyledTableData
          align={align}
          isCheckbox={isCheckbox}
          verticalAlign={verticalAlign}
          width={width}
          withPadding={withPadding}
        >
          {children}
        </StyledTableData>
      );
    };

    return tableSectionContext === 'thead' ? renderHeader() : renderData();
  },
);
