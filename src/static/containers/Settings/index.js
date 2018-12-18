import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

import './styles.scss';

class SettingsView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
    }).isRequired,
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Settings</h1>
        <div className="buttons-wrapper">
          <button
            type="button"
            onClick={() => {this.props.actions.authLogoutAndRedirect()}}
            className="easylock-button">
            Logout
          </button>
          <button
            type="button"
            onClick={() => {
              this.props.actions.deleteAccount(this.props.userId, this.props.token)}}
            className="easylock-button">
              delete account
          </button>
          <button
            type="button"
            onClick={() => {
              this.props.dispatch(push('/upload'))}}
            className="easylock-button">
              add pictures
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
export { SettingsView as SettingsViewNotConnected };
