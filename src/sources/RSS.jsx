import React, { Component } from 'react';

class RSS extends Component {
  render() {
    return (
        <div className="rss">
            <h2> RSS Feeds: </h2>
            <ul>
                {this.props.feeds}
            </ul>
        </div>
    );
  }
}

export default RSS;
