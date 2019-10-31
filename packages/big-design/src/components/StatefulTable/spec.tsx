import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { StatefulTable, StatefulTableProps } from './StatefulTable';

/**
 * Generate items that looks like:
 * [
 *    { name: 'Product A - 1', stock: 1 },
 *    { name: 'Product B - 2', stock: 2 },
 *    ...
 *    { name: 'Product A - 26', stock: 26 },
 *    { name: 'Product B - 27', stock: 27 },
 * ]
 */

interface TestItem {
  name: string;
  stock: number;
}

const generateItems = (): TestItem[] =>
  [...Array(100)].map((_, index) => ({
    name: `Product ${String.fromCharCode(65 + (index % 25))} - ${index + 1}`,
    stock: index + 1,
  }));

const getSimpleTable = (props: Partial<StatefulTableProps<TestItem>> = {}) => (
  <StatefulTable
    columns={[
      { header: 'Name', hash: 'name', render: ({ name }) => <span data-testid="name">{name}</span>, sortKey: 'name' },
      {
        header: 'Stock',
        hash: 'stock',
        render: ({ stock }) => <span data-testid="stock">{stock}</span>,
        sortKey: 'stock',
      },
    ]}
    items={generateItems()}
    {...props}
  />
);

test('renders paginated table by default', () => {
  const { container } = render(getSimpleTable());

  const rows = container.querySelectorAll('tbody > tr');

  expect(rows.length).toBe(25);
});

test('pagination can be disabled', () => {
  const { container } = render(getSimpleTable({ pagination: false }));

  const rows = container.querySelectorAll('tbody > tr');

  expect(rows.length).toBe(100);
});

test('changing pagination page changes the displayed items', () => {
  const { getByTitle, getAllByTestId } = render(getSimpleTable());

  const pageOneItemName = getAllByTestId('name')[0].textContent;
  fireEvent.click(getByTitle('Next page'));
  const pageTwoItemName = getAllByTestId('name')[0].textContent;

  expect(pageOneItemName).not.toBe(pageTwoItemName);
});

test('renders rows without checkboxes by default', () => {
  const { queryAllByRole } = render(getSimpleTable());

  expect(queryAllByRole('checkbox').length).toBe(0);
});

test('renders rows without checkboxes when opting in to selectable', () => {
  const { queryAllByRole } = render(getSimpleTable({ selectable: true }));

  // 25 tbody rows + Select all checkbox
  expect(queryAllByRole('checkbox').length).toBe(26);
});

test('items are unselected by default', () => {
  const { container } = render(getSimpleTable({ selectable: true }));
  const checkbox = container.querySelector('tbody > tr input') as HTMLInputElement;

  expect(checkbox.checked).toBe(false);
});

test('items can be selected by default', () => {
  const testItem = { name: 'Test Item', stock: 1 };
  const items: TestItem[] = [testItem];
  const { container } = render(getSimpleTable({ selectable: true, items, defaultSelected: [testItem] }));
  const checkbox = container.querySelector('tbody > tr input') as HTMLInputElement;

  expect(checkbox.checked).toBe(true);
});
