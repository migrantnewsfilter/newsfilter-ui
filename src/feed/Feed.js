import React, { Component } from 'react';
import Article from './Article';
import Filter from './Filter';
import './Feed.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from '../AppDispatcher';

class Feed extends Component {

  constructor(props) {
    super(props)
    this._loadMore()
  }

  _loadMore = () => {
    dispatch({
      type: 'articles/load',
      label: this.props.label,
      filter: this.props.filter,
      start: this.props.articles.size
    })
  }

  render() {
    const { articles } = this.props;
    const arts = articles.map(a => {
      return <li> <Article article={a} highlighted={this.props.highlighted === a.get('cluster')} /> </li>
    })
    return (
      <div className="feed">
        <Filter filter={this.props.filter} loadMore = { this._loadMore }></Filter>
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
