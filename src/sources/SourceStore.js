import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {SourceDispatcher, dispatch} from './SourceDispatcher';
import io from 'socket.io-client';
import axios from 'axios';

class SourceStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)

    // connect to host!
    const host = process.env.REACT_APP_NF_HOST || 'http://localhost:5000'

    axios.get(host + '/sources')
      .then(a => {
        dispatch({ type: 'rss/add', feeds: a.data.rss })
        dispatch({ type: 'twitter/add', feeds: a.data.twitter })
      });
  }

  getInitialState() {
    return Immutable.Map();
  }

  reduce (state, action) {
    switch (action.type) {

    case 'rss/add':

    case 'rss/remove':

    case 'twitter/add':

    case 'twitter/remove':


    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new ArticleStore(ArticleDispatcher);
export default instance;
