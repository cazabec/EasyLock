import React from 'react';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const UserList = props =>
  (<div>
    <Table
      width={500}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={props.users.length}
      rowGetter={({ index }) => props.users[index]}
    >
      <Column
        label='Name'
        dataKey='first_name'
        width={200}
      />
      <Column
        width={300}
        dataKey='expiration'
        label='Expiration'
        cellDataGetter={({rowData}) => '01/10/1997'}
      />
    </Table>
  </div>);

export default UserList;
