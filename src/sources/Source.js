import React, { Component } from 'react';
import Term from './Term'
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from '../AppDispatcher';

class Source extends Component {

  constructor(props) {
    super(props)
    this.state = { input: ''}
    this._onChange = this._onChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
  }

  _onChange(e) {
    this.setState({ input: e.target.value })
  }

  _onSubmit(e) {
    e.preventDefault()
    dispatch({
      type: 'source/add',
      source: this.props.source,
      term: this.state.input
    })
    this.setState({ input: ''})
  }

  _getHintText() {
    return this.props.source == 'twitter' ?
      'New term for Twitter search' :
      'New URL from Google Alerts';
  }

  render() {
    const feeds = this.props.feeds.map((f,k) => {
      return <Term key={k} index={k} text={f} source={this.props.source} />
    });

    return (
        <div className="source">
          <h2> {this.props.source} </h2>
          <List className="source-list">
            {feeds}
          </List>
          <form className="add-new-feed" onSubmit={ this._onSubmit }>
            <TextField className="feed-input" hintText={this._getHintText()} fullWidth={true} value={ this.state.input } onChange={ this._onChange }/>
            <RaisedButton className="feed-submit" primary={true} style={{display: 'block', width: '88px' }}label="Add" type="submit"/>
          </form>

        </div>
    );
  }
}

export default Source;
