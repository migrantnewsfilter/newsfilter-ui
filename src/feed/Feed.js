import React, { Component } from 'react';
import Article from './Article';
import './Feed.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from '../AppDispatcher';

class Feed extends Component {

  _loadMore = () => {
      dispatch({
        type: 'articles/load',
	label: this.props.label || null
      })
  }

  render() {
    const { articles } = this.props;
    const arts = articles.map(a => {
      return <li> <Article article={a} highlighted={this.props.highlighted === a.get('cluster')} /> </li>
    })
    return (
        <div className="feed">
            <h2> {this.props.header}: </h2>
            <ul>
                {arts}
            </ul>
            <RaisedButton
                className="load-more"
                primary={true}
                label="Load More"
                onClick={this._loadMore} />
        </div>
    );
  }
}

export default Feed;
