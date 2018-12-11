import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Autocomplete from 'react-autocomplete';
import Datetime from 'react-datetime';

import * as actionCreatorsUsers from '../../actions/users';
import * as actionCreatorsLocks from '../../actions/locks';

class InviteView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      lock: this.props.match.params.id,
      expiration: null,
      value: '',
    };

  }

  componentWillMount() {
    this.props.actions.getUsers(this.props.token);
  }

  handleSubmit(event) {
    const userId = this.props.users.filter(u => u.email === this.state.user)[0].id;
    this.props.actions.invite(
      userId,
      this.state.lock,
      this.state.expiration,
      this.props.token,
    );
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <p className="text-center">invite</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Autocomplete
            items={this.props.users}
            shouldItemRender={(item, value) => item.email.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.email}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.email}
              </div>
            }
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
            onSelect={value => this.setState({ user: value })}
          />
          <Datetime onChange={date => {this.setState({expiration: date.format()});}} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.list,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    Object.assign({}, actionCreatorsUsers, actionCreatorsLocks), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteView);
