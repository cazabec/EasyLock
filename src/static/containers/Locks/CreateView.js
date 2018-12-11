import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreatorsLocks from '../../actions/locks';

class CreateView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
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

  render() {
    return (
      <div className="container">
        <p className="text-center">create</p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeTitle} />
        </label>
        <label>
          Description:
          <textarea value={this.state.description} onChange={this.handleChangeDescription} />
          </label>
        <input type="submit" value="Submit" />
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
