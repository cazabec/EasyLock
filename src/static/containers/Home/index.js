import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
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
                <div className="text-center">
                    <h1>Easylock</h1>
                    <h4>Hello {this.props.userName || 'guest'}</h4>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        user: state.auth.user,
        statusText: state.auth.statusText,
        uploadDone: state.upload.uploadDone,
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
