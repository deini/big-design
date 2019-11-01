import { H0, H1, H2, StatefulTable, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, NextLink } from '../../components';
import { StatefulTableColumnsPropTable, StatefulTablePropTable } from '../../PropTables';

import { items } from './mocks';

export default () => {
  return (
    <>
      <H0>StatefulTable</H0>

      <Text>
        StatefulTable is a wrapper of <NextLink href="/table">Table</NextLink> that simplifies it's usage when having
        the full list of items in memory. It supports pagination, row selection, and sorting out of the box.
      </Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <StatefulTable
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
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

      <H1>API</H1>
      <StatefulTablePropTable />
      <StatefulTableColumnsPropTable id="stateful-table-columns-prop-table" />

      <H1>Examples</H1>
      <H2>Usage with pagination, selection, and sorting.</H2>

      <CodePreview scope={{ items }}>
        {/* jsx-to-string:start */}
        <StatefulTable
          itemName="Products"
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock, sortKey: 'stock' },
          ]}
          items={items}
          pagination
          selectable
        />
        {/* jsx-to-string:end */}
      </CodePreview>
    </>
  );
};
