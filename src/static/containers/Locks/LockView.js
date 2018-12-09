import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/locks';


class LockView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      getRights: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.getRights(this.props.token);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">{this.props.match.params.id}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locks: state.locks.list,
  rights: state.locks.rights,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LockView);
export { LockView as LockViewNotConnected };
