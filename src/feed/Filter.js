import React, { Component } from 'react';
import './Filter.css';
import {dispatch} from '../AppDispatcher';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      days: this.props.filter.get('days'),
      relevance: this.props.filter.get('relevance')
    };
    this._onChange = this._onChange.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {

    // When the user changes the filter, we reload the entire feed!
    if (!props.filter.equals(this.props.filter)) {
      this.setState({
        days: props.filter.get('days'),
        relevance: props.filter.get('relevance')
      });

      this.props.loadMore();
    }
  }

  _onSubmit(e) {
    e.preventDefault()

    dispatch({
      type: 'filter/days',
      days: +this.state.days
    });

    dispatch({
      type: 'filter/relevance',
      relevance: this.state.relevance
    });
  }

  _onChange(e, val) {
    this.setState({ days: val })
  }

  _onToggle(e, bool) {
    this.setState({ relevance: bool })
  }

  render() {
    const days = this.props.filter.get('days');

    return (
      <div className="filter">
        <form className="filter-form" onSubmit={ this._onSubmit }>
          <span> Number of days: </span>
          <TextField className="filter-days" fullWidth={false} value={ this.state.days } onChange={ this._onChange } style={{ width: '35px', fontFamily: 'inherit' }} inputStyle={{ textAlign: 'center' }}/>
          <Toggle onToggle={ this._onToggle } toggled={ this.state.relevance } label="Sort by relevance" style={{ display: 'inline-block', width: '200px', marginLeft: '2em'}} labelStyle={{ fontFamily: 'inherit'}}/>
          <RaisedButton className="filter-submit" primary={true} style={{display: 'inline-block', width: '88px', marginLeft: '4em' }} label="Update" type="submit"/>
        </form>
      </div>
    );
  }
}

export default Filter;
