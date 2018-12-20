import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Autocomplete from 'react-autocomplete';
import Datetime from 'react-datetime';
import TimeField from 'react-simple-timefield';

import * as actionCreatorsUsers from '../../actions/users';
import * as actionCreatorsLocks from '../../actions/locks';

import './react-datetime.css';


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
      start_time: '00:00',
      stop_time: '00:00',
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
      this.state.start_time,
      this.state.stop_time,
      this.props.token,
    );
    event.preventDefault();
  }

  renderMenu(items, value, style) {
    style.minWidth='300px';
    return <div style={{ ...style, ...this.menuStyle }} children={items}/>
  }

  render() {
    return (
      <div className="container invite-container">
        <h1>Invitation</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="autocomplete-wrapper">
            <Autocomplete
              items={this.props.users}
              shouldItemRender={(item, value) =>
                item.email.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.email}
              renderMenu={this.renderMenu}
              inputProps={{ placeholder: 'adresse email' }}
              renderItem={(item, highlighted) =>
                (<div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                >
                  {item.email}
                </div>)
              }
              value={this.state.user}
              onChange={e => this.setState({ user: e.target.value })}
              onSelect={value => this.setState({ user: value })}
            />
          </div>
          <TimeField
            value={this.state.start_time}
            onChange={(value) => { this.setState({start_time: value});}}
            className='timefield'
          />
          <TimeField
            value={this.state.stop_time}
            onChange={(value) => { this.setState({stop_time: value});}}
            className='timefield'
          />
          <div className="datetime-wrapper">
            <Datetime
              onChange={date =>
                {this.setState({expiration: date.format()}); }}
              inputProps={{ placeholder: 'date d\'expiration' }}
            />
          </div>
          <button className="easylock-button" type="submit" value="Submit"> inviter </button>
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
