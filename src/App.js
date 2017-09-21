import React, { Component } from 'react';
import axios from 'axios';

import {Container} from 'flux/utils';
import ArticleStore from './feed/ArticleStore';
import FilterStore from './feed/FilterStore';
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
    return [ArticleStore, ClusterStore, SourceStore, FilterStore];
  }

  static calculateState(prevState) {
    return {
      articles: ArticleStore.getState(),
      highlightedCluster: ClusterStore.getState(),
      sources: SourceStore.getState(),
      filter: FilterStore.getState()
    };
  }

  render() {
    const trash = this.state.articles.get('rejected')
    const archive = this.state.articles.get('accepted')
    const unlabelled = this.state.articles.get('unlabelled')

    const sources = this.state.sources;
    const filter = this.state.filter;

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Tabs initialSelectedIndex={0} className="feeds">
                <Tab label="Feed">
                    <Feed articles={ unlabelled } header="New Articles" label="unlabelled" highlighted={this.state.highlightedCluster} filter = {filter}/>
                </Tab>
                <Tab label="rejected">
                    <Feed articles={ trash } header="Rejected Articles" label="rejected" highlighted={this.state.highlightedCluster} filter = {filter} />
                </Tab>
                <Tab label="accepted">
                    <Feed articles={ archive } header="Accepted Articles" label="accepted"  highlighted={this.state.highlightedCluster} filter = {filter} />
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
