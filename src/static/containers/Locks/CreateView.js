import React from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Form = t.form.Form;

import * as actionCreatorsLocks from '../../actions/locks';

 const CreateLock = t.struct({
    name: t.String,
    description: t.String
  });

  const CreateLockFormOptions = {
      auto: 'placeholders',
      fields: {
          password: {
              type: 'password'
          }
      }
  };

class CreateView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        name: '',
        description: '',
      },
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({name: event.target.value});
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }


  handleSubmit(event) {
    this.props.actions.createLock(
      this.state.name,
      this.state.description,
      this.props.token,
    );
    event.preventDefault();
  }

  createLock = (e) => {
        e.preventDefault();
        const value = this.createLockForm.getValue();
        if (value) {
            this.props.actions.createLock(
              value.name,
              value.description,
              this.props.token,
            );
        }
    };

  render() {
    return (
      <div className="container create-lock-container">
        <h1>Nouvelle serrure</h1>
        <form onSubmit={this.createLock}>
            <Form ref={(ref) => { this.createLockForm = ref; }}
                type={CreateLock}
                options={CreateLockFormOptions}
                value={this.state.formValues}
                onChange={this.onFormChange}
            />
            <button
                type="submit"
                className="easylock-button"
            >
                Submit
            </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    Object.assign({}, actionCreatorsLocks), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
