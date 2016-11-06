import React, { Component } from 'react';
import axios from 'axios';

import {Container} from 'flux/utils';
import ArticleStore from './feed/ArticleStore';
import {dispatch} from './feed/ArticleDispatcher';

import logo from './logo.svg';
import './App.css';
import Feed from './feed/Feed';
import RSS from './RSS/RSS';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import muiTheme from './theme';

class App extends Component {

  constructor() {
    super();

  //   this.state = {
  //     articles: []
  //   }

    axios.get('http://localhost:5000/articles')
      .then(a => dispatch({ type: 'articles/arrivals', articles: a.data }));
  }

  static getStores() {
    return [ArticleStore];
  }

  static calculateState(prevState) {
    return {
      articles: ArticleStore.getState()
    };
  }

  render() {

    // const trash = this.state.articles.filter(a => a.label === 'rejected');
    // const archive = this.state.articles.filter(a => a.label === 'accepted');
    const unlabelled = this.state.articles.filter(a => !a.get('label'));

    return (

        <MuiThemeProvider muiTheme={muiTheme}>
            <Tabs initialSelectedIndex={0}>
                <Tab label="Feed">
                    <div className="App">
                        <div className="App-header">
                        </div>
                        <Feed articles={ unlabelled }/>
                    </div>
                </Tab>
                <Tab label="rejected">
                    trash
                </Tab>
                <Tab label="accepted">
                    goodstuff
                </Tab>
                <Tab label="RSS Feeds">
                    <RSS />
                </Tab>
            </Tabs>
        </MuiThemeProvider>
    );
  }
}


const AppContainer = Container.create(App);
export default AppContainer;
