import { Link, Small, Table, TableFigure, Text } from '@bigcommerce/big-design';
import React, { ReactNode } from 'react';

import { Code } from '../Code';

interface TypesDataProps {
  types: any;
}

export interface Prop {
  name: ReactNode;
  types: ReactNode | ReactNode[];
  defaultValue?: ReactNode;
  description: ReactNode;
  required?: boolean;
}

export interface PropTableProps {
  propList: Prop[];
}

export class PropTable extends React.PureComponent<PropTableProps> {
  render() {
    const items = this.props.propList;

    return (
      <TableFigure>
        <Table
          columns={[
            {
              header: 'Prop Name',
              render: ({ name, required }) => (
                <>
                  <Code primary>{name}</Code>
                  {required ? <b> *</b> : null}
                </>
              ),
            },
            {
              header: 'Type',
              render: ({ types }) => <TypesData types={types} />,
            },
            {
              header: 'Default',
              render: ({ defaultValue }) => <Code highlight={false}>{defaultValue}</Code>,
            },
            {
              header: 'Description',
              width: '50%',
              render: ({ description }) => <Text>{description}</Text>,
            },
          ]}
          items={items}
        />

        <Small>Props ending with * are required</Small>
      </TableFigure>
    );
  }
}

const TypesData: React.FC<TypesDataProps> = (props): any => {
  const { types } = props;

  if (Array.isArray(types)) {
    return types.map((type, index) => {
      return (
        <React.Fragment key={type}>
          {type.type === Link ? <Code highlight={false}>{type}</Code> : <Code>{type}</Code>}
          {index < types.length - 1 ? ' | ' : null}
        </React.Fragment>
      );
    });
  }

  return types.type === Link ? <Code highlight={false}>{types}</Code> : <Code>{types}</Code>;
};
