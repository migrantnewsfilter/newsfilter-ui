import React, { Component } from 'react';

class Sources extends Component {
  render() {
    return (
        <div className="sources">
            <h2> Sources: </h2>
            <ul>
                {this.props.feeds}
            </ul>
        </div>
    );
  }
}

export default Sources;
