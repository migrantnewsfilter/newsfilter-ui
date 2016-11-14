import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ArticleDispatcher, dispatch} from './ArticleDispatcher';
import io from 'socket.io-client';
import axios from 'axios';

class ArticleStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)

    // connect to host!
    const host = process.env.REACT_APP_NF_HOST || 'http://localhost:5000'
    this.socket = io.connect(host);
    axios.get(host + '/articles')
      .then(a => dispatch({ type: 'articles/arrivals', articles: a.data }));
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce (state, action) {
    switch (action.type) {

    case 'article/label':
      console.log(action.label)
      this.socket.emit('label', { '_id': action.id, 'label': action.label })
      return state.setIn([action.id, 'label'], action.label);

    case 'articles/arrivals':
      console.log('arrivals: ', action.articles)
      return action.articles.reduce((state, a) => {
        return state.set(a._id, Immutable.fromJS(a))
      }, state);

    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new ArticleStore(ArticleDispatcher);
export default instance;
