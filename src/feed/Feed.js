import React, { Component } from 'react';
import Article from './Article';
import './Feed.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Feed extends Component {
  render() {
    const { articles } = this.props;
    const arts = articles.map(a => <li> <Article article={a} /> </li>)
    return (
        <div className="feed">
            <h2> New Articles: </h2>
            <ul>
                {arts}
            </ul>
        </div>
    );
  }
}

export default Feed;
