import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.scss';

class HomeView extends React.Component {
    static propTypes = {
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        statusText: '',
        userName: '',
    };

    componentWillMount() {
        if (this.props.user.profile_picture === null && !this.props.uploadDone) {
            this.props.dispatch(push('/upload'));
        }
    }

    render() {
        return (
            <div className="container">
                <div className="home-wrapper">
                    <h4><span className="welcome">Welcome</span> {this.props.user.first_name || ''} !</h4>
                    <img
                        src='https://res.cloudinary.com/dob8jdp8o/image/upload/v1545128805/EasyLock/1_Da2AbqNvq58WsO-zGibwXw.png'
                        alt='facial recognition image'
                    />
                    <div className="list-wrapper">
                        <ol className="custom-counter">
                          <li>  Create your lock online</li>
                          <li>  Decide who can enter and when he can</li>
                          <li>  Link your lock to our API in 5 minutes</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        user: state.auth.user,
        uploadDone: state.upload.uploadDone,
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
