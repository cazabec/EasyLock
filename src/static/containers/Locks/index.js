import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlusIcon from './assets/plus.svg';

import * as actionCreators from '../../actions/locks';

import LockList from '../../components/locks';

import './styles.scss';

class LocksView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      getLocks: PropTypes.func.isRequired,
      getRights: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.getLocks(this.props.token);
    this.props.actions.getRights(this.props.token);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Locks</h1>
        <button
          type="button"
          className="btn-circle-xl"
          onClick={() => {this.props.dispatch(push('/lock/new'))}}>
          <img src={PlusIcon} className="App-logo" alt="logo" />
        </button>
        {
          this.props.locks.length && this.props.rights.length ?
          <div className="table-wrapper">
            <LockList locks={this.props.locks} rights={this.props.rights} me={this.props.me}/>
          </div> : 'You do not have any lock'
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locks: state.locks.list,
  rights: state.locks.rights,
  me: state.auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocksView);
export { LocksView as LocksViewNotConnected };
