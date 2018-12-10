import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Login = t.struct({
  email: t.String,
  firstname: t.String,
  lastname: t.String,
  password: t.String,
});

const RegisterFormOptions = {
  auto: 'placeholders',
  help: <i>Hint: j@j.com / john / doe / johnIsTheBest</i>,
  fields: {
    password: {
      type: 'password',
    },
  },
};

class RegisterView extends React.Component {
  static propTypes = {
    statusText: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      authRegisterUser: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    statusText: '',
    location: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
      },
    };
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/upload');
    }
  }

  onFormChange = (value) => {
    this.setState({ formValues: value });
  };

  register = (e) => {
    e.preventDefault();
    const value = this.registerForm.getValue();
    console.log(value);
    if (value) {
      this.props.actions.authRegisterUser(value.email,
        value.firstname,
        value.lastname,
        value.password);
    }
  };

  render() {
    let statusText = null;
    if (this.props.statusText) {
      const statusTextClassNames = classNames({
        alert: true,
        'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
        'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0,
      });

      statusText = (
        <div className="row">
          <div className="col-sm-12">
            <div className={statusTextClassNames}>
              {this.props.statusText}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <h1 className="text-center">Register</h1>
        <div className="login-container margin-top-medium">
          {statusText}
          <form onSubmit={this.register}>
            <Form
              ref={(ref) => { this.registerForm = ref; }}
              type={Login}
              options={RegisterFormOptions}
              value={this.state.formValues}
              onChange={this.onFormChange}
            />
            <button
              type="submit"
              className="btn btn-default btn-block"
            >
              Register
            </button>
          </form>
        </div>
        <Link to="/login">Already have an account ?</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statusText: state.auth.statusText,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
