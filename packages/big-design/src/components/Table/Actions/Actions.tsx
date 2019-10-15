import React, { memo } from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { Pagination } from '../../Pagination';
import { Text } from '../../Typography';
import { TableItem, TablePagination, TableSelectable } from '../types';

import { StyledActions } from './styled';

export interface ActionsProps<T> {
  items: T[];
  pagination?: TablePagination;
  selectable?: TableSelectable<T>;
  tableId: string;
}

export const Actions = memo(
  <T extends TableItem>({ selectable, pagination, tableId, items = [], ...props }: ActionsProps<T>) => {
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

    const renderSelectAllAction = ({ itemType, selectedItems }: TableSelectable<T>) => {
      const totalSelectedItems = selectedItems.length;
      const totalItemsInPage = items.length;
      const isChecked = totalSelectedItems === totalItemsInPage && totalItemsInPage > 0;
      const isIndeterminate = totalSelectedItems > 0 && totalSelectedItems !== totalItemsInPage;

      return (
        <Flex.Item flexGrow={2}>
          <Flex>
            <Checkbox isIndeterminate={isIndeterminate} checked={isChecked} onChange={handleSelectAll} />
            <Text marginLeft="small">
              {totalSelectedItems}/{totalItemsInPage} {itemType}
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
  },
);
