import { Button, StatefulTable, StatefulTableColumn } from '@bigcommerce/big-design';
import { useMemo, useState } from 'react';

import { data, User } from './data';

const Avatar: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  return <img src={url} alt={name} style={{ borderRadius: '50%' }} />;
};

const columns: Array<StatefulTableColumn<User>> = [
  { header: 'Image', hash: 'img', render: ({ firstName, image }) => <Avatar url={image} name={firstName} /> },
  {
    header: 'Name',
    hash: 'name',
    render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    sortKey: 'firstName',
  },
  { header: 'Country', hash: 'country', render: ({ country }) => country },
  { header: 'Rank', hash: 'rank', render: ({ rank }) => rank, sortKey: 'rank' },
];

export default () => {
  const [, setCount] = useState(1);

  return (
    <>
      <Button onClick={() => setCount(s => s + 1)}>Re-Render!</Button>
      <StatefulTable itemName="Users" columns={columns} items={data} pagination={true} selectable={true} />
    </>
  );
};
