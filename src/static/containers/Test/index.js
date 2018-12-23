import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProgressButton from 'react-progress-button';
import classNames from 'classnames';

import ImageUploader from 'react-images-upload';

import * as actionCreators from '../../actions/upload';

import '../../../../node_modules/react-progress-button/react-progress-button.css';

class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  onDrop(pictureFiles) {
    this.setState({
      pictures: pictureFiles,
    });
  }

  upload() {
    this.props.actions.testLock(
      this.state.pictures[0],
      this.props.match.params.id,
      this.props.token);
  }

  render() {

    const statusTextClassNames = classNames({
      'alert': true,
      'alert-danger': this.props.test.user_id === null,
      'alert-success': this.props.test.user_id !== null,
    });

    const statusText = (
      <div className="row" style={{maxWidth: '500px'}}>
          <div className={statusTextClassNames}>
            {
              this.props.test.user_id === null ? 'NOT AUTHORIZED TO OPEN LOCK' :
                'AUTHORIZED with ' + this.props.test.similarity + ' confidence'
            }
          </div>
      </div>
    );

    let buttonState;
    if (this.state.pictures.length < 1) {
      buttonState = 'disabled';
    } else if (this.props.uploadPending) {
      buttonState = 'loading';
    } else {
      buttonState = '';
    }

    return (
      <div className="container upload-container">
        {statusText}
        <h1 className="text-center">Test your lock !</h1>
        <p> To test the lock with id {this.props.match.params.id}
        Please upload a profile picture of someone </p>
        <ImageUploader
          withIcon
          withPreview
          buttonText="Choose a profile picture"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
        />
        <ProgressButton onClick={this.upload} state={buttonState}>
          Test lock
        </ProgressButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uploadPending: state.upload.uploadPending,
  test: state.upload.test,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestView);
export { TestView as TestViewNotConnected };
