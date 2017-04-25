import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {dispatch} from '../AppDispatcher';

class Term extends Component {
  _onDelete = () => {
    dispatch({
      type: 'source/remove',
      source: this.props.source,
      text: this.props.text,
      index: this.props.index
    })
  };

  render() {
    return (
      <ListItem className="list-item" hoverColor="transparent" primaryText={ this.props.text }  rightIconButton={<ActionDelete onClick={this._onDelete }/>}/>
    )
  }
}

export default Term;
