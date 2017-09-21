import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {redA200} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {dispatch} from '../AppDispatcher';
import Linkify from 'react-linkify';

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

  _onSimilar = () => {
    dispatch({
      type: 'article/view-similar',
      cluster: this.props.article.get('cluster')
    })
  }

  render() {
    const { article } = this.props;
    const content = article.get('content');
    const date = new Date(article.get('published').get('$date')).toLocaleString();
    const actionsStyles = {};
    const archiveStyles = {
      margin: '0 0 0 1em',
    };
    const grouped = {
      float: 'right'
    }
    const cardStyles = {
      boxShadow: this.props.highlighted ? `${redA200} 0px 0px 24px` : null
    }
    const linkProps = {
      target: '_blank'
    };

    return (
        <Card className={"article"} containerStyle={cardStyles}>
            <CardHeader title={ content.get('title') || '@' + content.get('author') } subtitle={ 'Relevance: ' + (article.get('prediction') || 0)  + ' Date: ' + date }/>

            <CardText className="body">
                <Linkify properties = {linkProps}> { content.get('body') }</Linkify>
            </CardText>

            <CardActions style={actionsStyles}>
                <RaisedButton
                    primary={true}
                    label="Source"
                    href={content.get('link')}
                    target="_blank"/>
                <RaisedButton
                    primary={true}
                    label="Similar"
                    onClick={this._onSimilar}
                    target="_blank"/>

                <div style={grouped}>
                    <RaisedButton
                        buttonStyle={{ backgroundColor: redA200 }}
                        secondary={true}
                        label="Reject"
                        onClick={this._onLabel.bind(this, 'rejected')}/>
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
