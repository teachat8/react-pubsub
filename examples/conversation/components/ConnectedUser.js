import React, { Component, PropTypes } from 'react';
import { TALK } from '../utils/constants';
import { createPubSubConnector } from 'react-pubsub';

class ConnectedUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.inputChanged = this.inputChanged.bind(this);
    this.talk = this.talk.bind(this);
  }

  talk() {
    const { talkAction, owner } = this.props;
    const { msg } = this.state;
    const timestamp = new Date();

    talkAction({ msg, owner, timestamp });
  }

  inputChanged(evt) {
    const { target: { value: msg } } = evt;
    this.setState({ msg });
  }

  render() {
    const { msg } = this.state;
    const { owner } = this.props;
    return (
      <div>
        <strong>{owner}:</strong>
        <input
          onChange={this.inputChanged}
          value={msg}
          type="text" placeholder="Say something"/>
        <button
          disabled={!msg}
          onClick={this.talk}>talk</button>
      </div>
    );
  }
}

ConnectedUser.propTypes = {
  owner: PropTypes.string.isRequired,
  talkAction: PropTypes.func.isRequired,
};

const publishToProps = {
  [TALK]: (publish, msgDetails) => publish(TALK, msgDetails),
};

export default createPubSubConnector(null, publishToProps)(ConnectedUser);
