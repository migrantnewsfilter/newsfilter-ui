import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppDispatcher, dispatch} from '../AppDispatcher';
import io from 'socket.io-client';
import axios from 'axios';
import querystring from 'querystring';

class ArticleStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)

    this.host = process.env.REACT_APP_NF_HOST || 'http://localhost:5000'
    this.socket = io.connect(this.host);
    // dispatch({ type: 'articles/load' });
  }

  getInitialState() {
    return Immutable.Map({
      'unlabelled': Immutable.OrderedMap(),
      'rejected': Immutable.OrderedMap(),
      'accepted': Immutable.OrderedMap()
    });
  }

  reduce (state, action) {
    switch (action.type) {

    case 'article/view-similar':

      axios.get(this.host + '/cluster/' + action.cluster)
        .then(a => dispatch({ type: 'articles/arrivals', articles: a.data }))
        .then(() => dispatch({ type: 'cluster/highlight', cluster: action.cluster }))
      return state;

    case 'article/label':
      this.socket.emit('label', { '_id': action.id, 'label': action.label })

      const article = state.getIn([action.previousLabel, action.id])
      return state
            .deleteIn([action.previousLabel, action.id])
            .setIn([action.label, action.id], article.set('label', action.label))

    case 'articles/load':
      const qs = querystring.stringify({
	start: action.start,
	label: action.label,
	days: action.filter.get('days'),
        relevance: action.filter.get('relevance')
      })

      axios.get(this.host + '/articles?' +  qs)
        .then(a => dispatch({ type: 'articles/arrivals', articles: a.data, label: action.label }));
      return state

    case 'articles/arrivals':
      console.log('arrivals: ', action.articles, action.label)

      // We replace the entire OrderedMap of articles of this type
      // with a fresh OrderedMap created from the JSON sent from the server.
      state = state.delete(action.label)
      state = state.set(action.label, Immutable.OrderedMap())

      return action.articles.reduce((state, a) => {
        return state.setIn([action.label, a._id], Immutable.fromJS(a))
      }, state);

    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new ArticleStore(AppDispatcher);
export default instance;
