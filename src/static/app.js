import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

class App extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      children: PropTypes.shape().isRequired,
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    };

    static defaultProps = {
      location: undefined,
    };

    logout = () => {
      this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
      this.props.dispatch(push('/home'));
    };

    goToLogin = () => {
      this.props.dispatch(push('/login'));
    };

    goToProtected = () => {
      this.props.dispatch(push('/protected'));
    };

    goToLocks = () => {
      this.props.dispatch(push('/locks'));
    };

    goToSettings = () => {
      this.props.dispatch(push('/settings'));
    };


    render() {
        const homeClass = classNames({
            active: this.props.location && this.props.location.pathname === '/'
        });
        const protectedClass = classNames({
            active: this.props.location && this.props.location.pathname === '/protected'
        });
        const loginClass = classNames({
            active: this.props.location && this.props.location.pathname === '/login'
        });

        return (
            <div className="app">
                <div className="row">
                    <nav className="navbar navbar-default col-xs-6">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button"
                                    className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#top-navbar"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <a className="navbar-brand" onClick={this.goToIndex}>
                                    EasyLock Demo app
                                </a>
                            </div>
                                {this.props.isAuthenticated ?
                                    <div className="collapse navbar-collapse" id="top-navbar">
                                        <a className="navbar-brand" onClick={this.goToLocks}>
                                            my locks
                                        </a>
                                        <a className="navbar-brand" onClick={this.goToSettings}>
                                            settings
                                        </a>

                                    </div> :
                                    <h2 className="navbar-title"> EasyLock, une solution pour administrer vos serrures simplement</h2>
                                }
                        </div>
                    </nav>

                    <div className="page-content-container">
                        {this.props.children}
                    </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  location: state.routing.location,
});

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
