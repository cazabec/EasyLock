import React from 'react';
import { Column, Table } from 'react-virtualized';
import Avatar from 'react-avatar';
import 'react-virtualized/styles.css'; // only needs to be imported once

const UserList = props =>
  (<div>
    <Table
      width={500}
      height={300}
      headerHeight={20}
      rowHeight={60}
      rowCount={props.users.length}
      rowGetter={({ index }) => props.users[index]}
    >
      <Column
        width={80}
        dataKey='profile_picture'
        label=''
        cellRenderer={data => <Avatar round size="60" src={data.cellData}/>}
      />
      <Column
        label='Name'
        dataKey='name'
        width={200}
        cellDataGetter={data => data.rowData.first_name + ' ' + data.rowData.last_name}
      />
      <Column
        width={300}
        dataKey='expiration'
        label='Expiration'
        cellDataGetter={data => props.rights.filter(
          r => r.lock === props.lock && r.user === data.rowData.id)[0].expiration}
      />

    </Table>
  </div>);

export default UserList;
