import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {ArticleDispatcher, dispatch} from './ArticleDispatcher';
import {dispatch as clusterDispatch} from './ClusterDispatcher';
import io from 'socket.io-client';
import axios from 'axios';
import querystring from 'querystring';

class ArticleStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)

    this.host = process.env.REACT_APP_NF_HOST || 'http://localhost:5000'
    this.socket = io.connect(this.host);
    dispatch({ type: 'articles/load' });
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

	_getStart(state, label){
		if (state.size == 0) {
			return 0;
		}
		if (!label) {
			return state.filter(a => !a.get('label')).size;
		}
		return state.filter(a => a.get('label') === label).size;
	}

  reduce (state, action) {
    switch (action.type) {

		case 'article/view-similar':

      axios.get(this.host + '/cluster/' + action.cluster)
        .then(a => dispatch({ type: 'articles/arrivals', articles: a.data }));

			clusterDispatch({ type: 'cluster/highlight', cluster: action.cluster })
			return state;

    case 'article/label':
      console.log(action.label, action.id)
      this.socket.emit('label', { '_id': action.id, 'label': action.label })
      return state.setIn([action.id, 'label'], action.label);

    case 'articles/load':
			const start = this._getStart(state, action.label);

			const qs = querystring.stringify({
				start: start,
				label: action.label,
				days: 10
			})

      axios.get(this.host + '/articles?' +  qs)
        .then(a => dispatch({ type: 'articles/arrivals', articles: a.data }));
      return state

    case 'articles/arrivals':
      console.log('arrivals: ', action.articles)

      const s = action.articles.reduce((state, a) => {
        return state.set(a._id, Immutable.fromJS(a))
      }, state);

			return s.sort((a,b) => {
				if (a.get('prediction') == b.get('prediction')) {
					return a.get('published') >= b.get('published') ? -1 : 1;
				}
				return a.get('prediction') >= b.get('prediction') ? -1 : 1;
			})

    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new ArticleStore(ArticleDispatcher);
export default instance;
