import React from 'react';
import { Column, Table } from 'react-virtualized';
import { withRouter } from 'react-router';
import 'react-virtualized/styles.css'; // only needs to be imported once

const LockList = props =>
  (<div>
    <Table
      width={500}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={props.locks.length}
      rowGetter={({ index }) => props.locks[index]}
      onRowClick={(row) => {props.history.push('/lock/' + row.rowData.id)}}
      style={{cursor: 'pointer'}}
    >
      <Column
        label='Name'
        dataKey='name'
        width={200}
      />
      <Column
        width={300}
        label='Description'
        dataKey='description'
      />
      <Column
        width={50}
        label='Members'
        dataKey='members'
        cellRenderer={data => props.rights.filter(right => data.rowData.id === right.lock).length}
      />
      <Column
        width={100}
        label='Role'
        dataKey='role'
        cellRenderer={data => props.rights.filter(
          right => data.rowData.id === right.lock &&
          props.me === right.user)[0].right}
      />


    </Table>
  </div>);

export default withRouter(LockList);
