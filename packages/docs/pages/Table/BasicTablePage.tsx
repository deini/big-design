import { H0, H1, H2, Table } from '@bigcommerce/big-design';
import { TableItem } from '@bigcommerce/big-design/dist/src/components/Table/types';
import React from 'react';

import { CodePreview } from '../../components';

interface Item extends TableItem {
  sku: string;
  name: string;
  stock: number;
}

const data: Item[] = [
  { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
  { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
  { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
  { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
  { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  { sku: 'TWB', name: '[Sample] Tiered Wire Basket', stock: 119 },
  { sku: 'OCG', name: '[Sample] Oak Cheese Grater', stock: 34 },
  { sku: 'SLLPJ', name: '[Sample] 1 L Le Parfait Jar', stock: 7 },
  { sku: 'CC3C', name: '[Sample] Chemex Coffeemaker 3 cup', stock: 49 },
  { sku: 'ABS', name: '[Sample] Able Brewing System', stock: 225 },
  { sku: 'OTS', name: '[Sample] Orbit Terrarium - Small', stock: 89 },
  { sku: 'OTL', name: '[Sample] Orbit Terrarium - Large', stock: 109 },
  { sku: 'SLCTBS', name: '[Sample] Fog Linen Chambray Towel - Beige Stripe with some fondu of some sort', stock: 49 },
];

const columns = [
  {
    header: 'Sku',
    render: ({ sku }) => sku,
  },
  {
    header: 'Name',
    render: ({ name }) => name,
  },
  {
    header: 'Stock',
    render: ({ stock }) => stock,
  },
];

export default () => {
  return (
    <>
      <H0>Table</H0>

      <CodePreview>
        {/* jsx-to-string:start */}
        <Table
          columns={[
            {
              header: 'Sku',
              render: ({ sku }) => sku,
            },
            {
              header: 'Name',
              render: ({ name }) => name,
            },
            {
              header: 'Stock',
              render: ({ stock }) => stock,
            },
          ]}
          items={[
            { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
            { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
            { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
            { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
            { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
          ]}
        />
        {/* jsx-to-string:end */}
      </CodePreview>

      <CodePreview scope={{ data, columns }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const [items] = React.useState(data);
          const [ranges] = React.useState([10, 20, 30, 50, 100]);

          const [range, setRange] = React.useState(ranges[0]);
          const [page, setPage] = React.useState(1);
          const [currentItems, setCurrentItems] = React.useState([]);

          const onItemsPerPageChange = newRange => {
            setPage(1);
            setRange(newRange);
          };

          React.useEffect(() => {
            const maxItems = page * range;
            const lastItem = Math.min(maxItems, items.length);
            const firstItem = Math.max(0, maxItems - range);

            // @ts-ignore
            setCurrentItems(items.slice(firstItem, lastItem));
          }, [page, items, range]);

          const [selectedItems, setSelectedItems] = React.useState([]);

          return (
            <Table
              stickyHeader
              columns={columns}
              items={currentItems}
              // @ts-ignore
              selectable={{
                itemsName: 'Products',
                onSelectionChange: setSelectedItems,
                selectedItems,
              }}
              pagination={{
                currentPage: page,
                totalItems: items.length,
                onPageChange: setPage,
                itemsPerPageOptions: ranges,
                onItemsPerPageChange,
                itemsPerPage: range,
              }}
            />
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>

      <H1>API</H1>

      <H2>Table</H2>

      {/* <TablePropTable />

      <H2>Table.Actions</H2>

      <TableActionsPropTable />

      <H2>Table.Body</H2>

      <TableBodyPropTable />

      <H2>Table.Cell</H2>

      <TableCellPropTable />

      <H2>Table.Footer</H2>

      <H2>Table.Head</H2>

      <H2>Table.Row</H2> */}

      {/* <H2>Static Member</H2>
      <H2>Inherited Props</H2>
      <Collapsible title="Inherited Props">
        <InheritedPropTable />
      </Collapsible>
      <H1>Examples</H1>
      <H2>Example 1</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet>
      <H2>Example 2</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet> */}
    </>
  );
};
