import React, { Component } from 'react';
import Source from './Source';
import './Sources.css';

class Sources extends Component {
  render() {
    const {sources} = this.props;
    const sections = sources.map((feeds, type) => {
      return <li> <Source source={type} feeds={feeds} /> </li>
    })
    return (
        <div className="sources">
            <ul>
            	{sections}
            </ul>
        </div>
    );
  }
}

export default Sources;
