import React from 'react';
import { Column, Table } from 'react-virtualized';
import { withRouter } from "react-router";
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
        width={300}
        label='Members'
        dataKey='members'
        cellRenderer={({cellData}) => 'users'}
      />

    </Table>
  </div>);

export default withRouter(LockList);
