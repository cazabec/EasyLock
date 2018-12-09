import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/locks';

import LockList from '../../components/locks';

class LocksView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      getLocks: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.getLocks(this.props.token);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Locks</h1>
        <LockList locks={this.props.locks || []} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locks: state.locks.list,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocksView);
export { LocksView as LocksViewNotConnected };
