import { Flex, H0, H1, H2, Pagination, Table } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
// import { TableActionsPropTable, TableBodyPropTable, TableCellPropTable, TablePropTable } from '../../PropTables';

interface Data {
  sku: string;
  name: string;
  price: number;
}

// function createData(sku, name, price): Data {
function createData(sku, name, price) {
  // return { sku, name, price };
  return {
    cells: [
      { content: sku },
      { content: name },
      {
        content: <h1>{price}</h1>,
      },
    ],
  };
}

// const data: Data[] = [
const data = [
  createData('SM13', '[Sample] Smith Journal 13', 25),
  createData('DPB', '[Sample] Dustpan & Brush', 34.95),
  createData('OFSUC', '[Sample] Utility Caddy', 45.95),
  createData('CLC', '[Sample] Canvas Laundry Cart', 200),
  createData('CGLD', '[Sample] Laundry Detergent', 29.95),
  createData('TWB', '[Sample] Tiered Wire Basket', 119.95),
  createData('OCG', '[Sample] Oak Cheese Grater', 34.95),
  createData('SLLPJ', '[Sample] 1 L Le Parfait Jar', 7),
  createData('CC3C', '[Sample] Chemex Coffeemaker 3 cup', 49.5),
  createData('ABS', '[Sample] Able Brewing System', 225),
  createData('OTS', '[Sample] Orbit Terrarium - Small', 89),
  createData('OTL', '[Sample] Orbit Terrarium - Large', 109),
  createData('SLCTBS', '[Sample] Fog Linen Chambray Towel - Beige Stripe with some fondu of some sort', 49),
];

// const columns: Array<{
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'left' | 'center' | 'right';
//   format?(value): string;
// }> = [
//   { id: 'sku', label: 'Product SKU', minWidth: 124 },
//   { id: 'name', label: 'Product Name', minWidth: 120 },
//   { id: 'price', label: 'Price', align: 'right', format: value => `$${value.toFixed(2)}` },
// ];
const columns = [{ content: 'Sku' }, { content: 'Name' }, { content: 'Price' }];

export default () => {
  return (
    <>
      <H0>Table</H0>

      {/* <Text>
        Intro text.
        <Link href="https://design.bigcommerce.com/components" target="_blank">
          Design Guidelines
        </Link>
        .
      </Text> */}

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
            <>
              <Table
                stickyHeader
                headers={columns}
                rows={currentItems}
                selectable={{
                  onSelectionChange: setSelectedItems,
                  selectedItems,
                }}
                pagination={{
                  currentPage: page,
                  totalItems: items.length,
                  onPageChange: setPage,
                  itemsPerPageOptions: ranges,
                  onItemsPerPageChange: setRange,
                  itemsPerPage: range,
                }}
              />
            </>
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
