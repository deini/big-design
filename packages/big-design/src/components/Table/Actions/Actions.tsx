import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { Pagination } from '../../Pagination';
import { Text } from '../../Typography';
import { TableItem, TablePagination, TableSelectable } from '../types';

import { StyledActions } from './styled';

export interface ActionsProps {
  items: TableItem[];
  pagination?: TablePagination;
  selectable?: TableSelectable;
  tableId: string;
}

export const Actions: React.FC<ActionsProps> = ({ selectable, pagination, tableId, items = [], ...props }) => {
  const handleSelectAll = () => {
    if (!selectable) {
      return;
    }

    const { selectedItems, onSelectionChange } = selectable;

    if (selectedItems.length > 0) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...items]);
    }
  };

  const renderSelectAllAction = ({ itemsName, selectedItems }: TableSelectable) => {
    const totalSelectedItems = selectedItems.length;
    const totalItemsInPage = items.length;
    const isChecked = totalSelectedItems === totalItemsInPage && totalItemsInPage > 0;
    const isIndeterminate = totalSelectedItems > 0 && totalSelectedItems !== totalItemsInPage;

    return (
      <Flex.Item flexGrow={2}>
        <Flex>
          <Checkbox isIndeterminate={isIndeterminate} checked={isChecked} onChange={handleSelectAll} />
          <Text marginLeft="small">
            {totalSelectedItems}/{totalItemsInPage} {itemsName}
          </Text>
        </Flex>
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
