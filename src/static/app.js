import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

library.add(faLock);
library.add(faCog);

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
                    <nav
                        className="navbar navbar-default col-xs-6"
                        style={{width: this.props.isAuthenticated ? '30%' : '50%'}}
                    >
                        {this.props.isAuthenticated ?
                            <div className='navbar-wrapper'>
                                <a className="navbar-brand" onClick={this.goToIndex}>
                                    EasyLock app
                                </a>
                                <Avatar round size="80" src={this.props.profile_picture_url}/>
                                <div className="link-section-wrapper">
                                    <a className="navbar-brand" onClick={this.goToLocks}>
                                        <FontAwesomeIcon icon="lock" size="2x" />
                                    </a>

                                    <a className="navbar-brand" onClick={this.goToSettings}>
                                        <FontAwesomeIcon icon="cog" size="2x" />
                                    </a>

                                </div>
                            </div> :
                            <div className="navbar-logout-wrapper">
                                <h1 className="navbar-title"> EasyLock </h1>
                                <h4> Une solution pour administrer vos serrures simplement</h4>
                            </div>
                        }
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
  profile_picture_url: state.auth.user.profile_picture,
  isAuthenticated: state.auth.isAuthenticated,
  location: state.routing.location,
});

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
