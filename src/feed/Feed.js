import React, { Component } from 'react';
import Article from './Article';
import './Feed.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from './ArticleDispatcher';

class Feed extends Component {

  _loadMore = () => {
      dispatch({
          type: 'articles/load'
      })
  }

  render() {
    const { articles } = this.props;
    const arts = articles.map(a => <li> <Article article={a} /> </li>)
    return (
        <div className="feed">
            <h2> New Articles: </h2>
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
