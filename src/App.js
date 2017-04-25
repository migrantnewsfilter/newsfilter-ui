import React, { Component } from 'react';
import axios from 'axios';

import {Container} from 'flux/utils';
import ArticleStore from './feed/ArticleStore';
import ClusterStore from './feed/ClusterStore';
import SourceStore from './sources/SourceStore';

import logo from './logo.svg';
import './App.css';
import Feed from './feed/Feed';
import Sources from './sources/Sources';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import muiTheme from './theme';

class App extends Component {
  static getStores() {
    return [ArticleStore, ClusterStore, SourceStore];
  }

  static calculateState(prevState) {
    return {
      articles: ArticleStore.getState(),
      highlightedCluster: ClusterStore.getState(),
      sources: SourceStore.getState()
    };
  }

  render() {

    const trash = this.state.articles.filter(a => a.get('label') === 'rejected');
    const archive = this.state.articles.filter(a => a.get('label') === 'accepted');
    const unlabelled = this.state.articles.filter(a => !a.get('label'));
    const sources = this.state.sources;

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Tabs initialSelectedIndex={0} className="feeds">
                <Tab label="Feed">
                    <Feed articles={ unlabelled } header="New Articles" highlighted={this.state.highlightedCluster}/>
                </Tab>
                <Tab label="rejected">
                    <Feed articles={ trash } header="Rejected Articles" label="rejected" highlighted={this.state.highlightedCluster}/>
                </Tab>
                <Tab label="accepted">
                    <Feed articles={ archive } header="Accepted Articles" label="accepted"  highlighted={this.state.highlightedCluster} />
                </Tab>
                <Tab label="Sources">
                    <Sources sources={ sources }/>
                </Tab>
            </Tabs>
        </MuiThemeProvider>
    );
  }
}


const AppContainer = Container.create(App);
export default AppContainer;
