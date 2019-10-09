import React, { useContext } from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { Pagination } from '../../Pagination';
import { TableContext } from '../context';
import { TablePagination, TableRow, TableSelectable } from '../types';

import { StyledActions } from './styled';

export interface ActionsProps {
  pagination?: TablePagination;
  selectable?: TableSelectable;
  rows: TableRow[];
}

export const Actions: React.FC<ActionsProps> = ({ selectable, pagination, rows = [], ...props }) => {
  const { tableId } = useContext(TableContext);

  const handleSelectAll = () => {
    if (!selectable) {
      return;
    }

    const { selectedItems, onSelectionChange } = selectable;

    if (selectedItems.length > 0) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...rows]);
    }
  };

  const renderSelectAllAction = ({ selectedItems }: TableSelectable) => {
    const totalSelectedItems = selectedItems.length;
    const totalItemsInPage = rows.length;
    const isChecked = totalSelectedItems === totalItemsInPage && totalItemsInPage > 0;
    const isIndeterminate = totalSelectedItems > 0 && totalSelectedItems !== totalItemsInPage;

    return (
      <Flex.Item flexGrow={2}>
        <Checkbox isIndeterminate={isIndeterminate} checked={isChecked} onChange={handleSelectAll} />
        {totalSelectedItems}/{totalItemsInPage} Products
      </Flex.Item>
    );
  };

  return (
    <StyledActions alignItems="center" aria-controls={tableId} justifyContent="stretch" padding="small" {...props}>
      {selectable && renderSelectAllAction(selectable)}
      {pagination && (
        <Flex.Item style={{ marginLeft: 'auto' }}>
          <Pagination {...pagination} />
        </Flex.Item>
      )}
    </StyledActions>
  );
};
