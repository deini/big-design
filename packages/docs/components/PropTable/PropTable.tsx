import { Small, Table, TableFigure } from '@bigcommerce/big-design';
import React, { ReactNode } from 'react';

import { Code } from '../Code';

import { TypesData } from './Prop';
import { StyledTableCell } from './Prop/styled';

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
    return <p>Prop Table</p>;
    // const items = this.props.propList.map(({ name, types, description, defaultValue = '', required }) => ({
    //   cells: [
    //     {
    //       content: (
    //         <StyledTableCell>
    //           <Code primary>{name}</Code>
    //           {required ? <b> *</b> : null}
    //         </StyledTableCell>
    //       ),
    //     },
    //     {
    //       content: (
    //         <StyledTableCell>
    //           <TypesData types={types} />
    //         </StyledTableCell>
    //       ),
    //     },
    //     {
    //       content: (
    //         <StyledTableCell>
    //           <Code highlight={false}>{defaultValue}</Code>
    //         </StyledTableCell>
    //       ),
    //     },
    //     {
    //       content: <StyledTableCell>{description}</StyledTableCell>,
    //     },
    //   ] as TableCell[],
    // }));

    // return (
    //   <TableFigure>
    //     <Table
    //       headers={[
    //         { content: 'Prop Name' },
    //         { content: 'Type' },
    //         { content: 'Default' },
    //         { content: 'Description', width: '50%' },
    //       ]}
    //       items={items}
    //     />

    //     <Small>Props ending with * are required</Small>
    //   </TableFigure>
    // );
  }
}
