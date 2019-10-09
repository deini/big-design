import React from 'react';

type SectionContext = 'thead' | 'tbody' | 'tfoot';

export const TableSectionContext = React.createContext<SectionContext>('tbody');

interface Context {
  stickyHeader?: boolean;
  tableId: string;
}

export const TableContext = React.createContext<Context>({
  tableId: '',
});
