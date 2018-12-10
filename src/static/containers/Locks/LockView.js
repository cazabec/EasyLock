import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreatorsUsers from '../../actions/users';
import * as actionCreatorsLocks from '../../actions/locks';

import UserList from '../../components/users';

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
    const lock = this.props.match.params.id;
    const rightsFilter = this.props.rights.filter((right) => lock === right.lock);
    const usersIds = rightsFilter.map((right) => right.user);
    const users = this.props.users.filter((user) => usersIds.includes(user.id))
    return (
      <div className="container">
        <UserList users={users} rights={this.props.rights} lock={lock}/>
        < p className="text-center">{this.props.match.params.id}</p>
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
