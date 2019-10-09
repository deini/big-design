import React, { memo, useContext } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableSectionContext } from '../context';
import { Cell } from '../Cell/Cell';

import { StyledTableRow } from './styled';

export interface RowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  isSelectable: boolean;
  selected?: boolean;
  onRowSelect?(nextValue: boolean): void;
}

export const Row: React.FC<RowProps> = memo(({ children, isSelectable, selected = false, onRowSelect, ...props }) => {
  const tableSectionContext = useContext(TableSectionContext);

  const handleSelect = () => {
    if (typeof onRowSelect === 'function') {
      onRowSelect(!selected);
    }
  };

  return (
    <StyledTableRow selected={selected} {...props}>
      {isSelectable ? (
        <Cell isCheckbox>
          {tableSectionContext === 'tbody' ? <Checkbox checked={selected} onChange={handleSelect} /> : null}
        </Cell>
      ) : null}
      {children}
    </StyledTableRow>
  );
});
