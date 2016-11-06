import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import ArticleDispatcher from './ArticleDispatcher';
import io from 'socket.io-client';

class ArticleStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)
    this.socket = io.connect('localhost:5000');
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
