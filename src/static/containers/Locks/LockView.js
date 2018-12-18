import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlusIcon from './assets/plus.svg';

import * as actionCreatorsUsers from '../../actions/users';
import * as actionCreatorsLocks from '../../actions/locks';

import UserList from '../../components/users';

import './styles.scss';

class LockView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      getUsers: PropTypes.func.isRequired,
      getLocks: PropTypes.func.isRequired,
      getRights: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.props.actions.getUsers(this.props.token);
    this.props.actions.getLocks(this.props.token);
    this.props.actions.getRights(this.props.token);
  }

  render() {
    const lockId = this.props.match.params.id;
    const lock = this.props.locks.filter((lock) => lock.id === lockId)[0];
    const rightsFilter = this.props.rights.filter((right) => right.lock === lockId);
    const usersIds = rightsFilter.map((right) => right.user);
    const users = this.props.users.filter((user) => usersIds.includes(user.id))
    return (
      <div className="container">
        <h1> { lock && lock.name } </h1>
        <button
          type="button"
          className="btn-circle-xl"
          onClick={() => {this.props.dispatch(push('/lock/' + lockId + '/invite'))}}>
          <img src={PlusIcon} className="App-logo" alt="logo" />
        </button>
        <div className="table-wrapper">
          <UserList users={users} rights={this.props.rights} lock={lockId}/>
        </div>
        <p>identifiant de la serrure:  {this.props.match.params.id}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locks: state.locks.list,
  rights: state.locks.rights,
  users: state.users.list,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    Object.assign({}, actionCreatorsUsers, actionCreatorsLocks), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LockView);
export { LockView as LockViewNotConnected };
