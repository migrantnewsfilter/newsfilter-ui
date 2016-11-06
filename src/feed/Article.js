import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from './ArticleDispatcher';


class Trash extends Component{
  render(){
    return (
        <i className="material-icons md-24">face</i>
    )
  }
}

class Article extends Component {

  _onLabel = (l) => {
    dispatch({
      type: 'article/label',
      id: this.props.article.get('_id'),
      label: l
    });
  }

  render() {
    const { article } = this.props;
    const content = article.get('content');
    const date = new Date(article.get('added').get('$date')).toLocaleString();

    const actionsStyles = {};
    const trashStyles = {};
    const archiveStyles = {
      margin: '0 0 0 1em',
    };
    const grouped = {
      float: 'right'
    }

    return (
      <Card  className="article">
          <CardHeader title={ content.get('title') } subtitle={ date }/>

          <CardText className="body">
              { content.get('body') }
          </CardText>

          <CardActions style={actionsStyles}>
              <RaisedButton
                  primary={true}
                  label="Source"
                  href={content.get('link')}
                  target="_blank"/>

              <div style={grouped}>
                  <RaisedButton
                      secondary={true}
                      label="Reject"
                      onClick={this._onLabel.bind(this, 'rejected')}
                      style={trashStyles} />
                  <RaisedButton
                      primary={true}
                      label="Accept"
                      onClick={this._onLabel.bind(this, 'accepted')}
                      style={archiveStyles}/>
              </div>

          </CardActions>
      </Card>
    );
  }
}

export default Article;
