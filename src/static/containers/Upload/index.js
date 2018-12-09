import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressButton from 'react-progress-button';

import ImageUploader from 'react-images-upload';

import * as actionCreators from '../../actions/upload';

import './style.scss';
import '../../../../node_modules/react-progress-button/react-progress-button.css';

class UploadView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      uploadPicture: PropTypes.func.isRequired,
      uploadPictureSuccess: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    statusText: '',
    location: null,
  };

  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  componentWillMount() {
    if (this.props.profile_picture !== null &&
      this.props.profile_picture !== undefined) {
      this.props.history.push('/home');
    }
  }

  onDrop(pictureFiles) {
    this.setState({
      pictures: pictureFiles,
    });
  }

  upload() {
    const promiseArray = [];
    this.state.pictures.forEach((picture) => {
      promiseArray.push(this.props.actions.uploadPicture(picture, this.props.token));
    });
    Promise.all(promiseArray).then(() => {
      this.props.actions.uploadPictureSuccess();
      this.props.history.push('/home');
    });
  }

  render() {
    let buttonState;
    if (this.state.pictures.length < 5) {
      buttonState = 'disabled';
    } else if (this.props.uploadPending) {
      buttonState = 'loading';
    } else {
      buttonState = '';
    }

    return (
      <div className="container">
        <h1 className="text-center">Upload photos</h1>
        <p> Please upload 5 profile images </p>
        <ImageUploader
          withIcon
          withPreview
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
        />
        <ProgressButton onClick={this.upload} state={buttonState}>
          Upload
        </ProgressButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile_picture: state.auth.user.profile_picture,
  uploadPending: state.upload.uploadPending,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadView);
export { UploadView as UploadViewNotConnected };
