import React from 'react';
import { Link } from 'react-router-dom';

const LockList = props =>
  (<div>
    {props.locks.map(l => (
      <Link to={ '/lock/' + l.id }key={l.id}>{l.name}</Link>
    ))}
  </div>);

export default LockList;
