import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppDispatcher, dispatch} from '../AppDispatcher';
import io from 'socket.io-client';
import axios from 'axios';

const host = process.env.REACT_APP_NF_HOST || 'http://localhost:5000'

class SourceStore extends ReduceStore {
  constructor(dispatcher){
    super(dispatcher)
    this.getFeeds()

  }

  getInitialState() {
    return Immutable.Map();
  }

  getFeeds() {
    axios.get(host + '/terms')
      .then(a => {
        dispatch({ type: 'source/arrivals', sources: a.data })
      });
  }

  reduce (state, action) {
    switch (action.type) {

    case 'source/arrivals':
      return action.sources.reduce((state, s) => {
        return state.set(s._id, Immutable.fromJS(s.feeds))
      }, state);

    case 'source/add':
      axios.post(host + '/terms', {source: action.source, feed: action.term})
        .then(this.getFeeds)
      return state.updateIn([action.source], l => l.push(action.term))

    case 'source/remove':
      console.log("remove", action.source, action.text, action.index)
      axios.delete(host+'/terms/'+action.source+'/'+encodeURIComponent(action.text))
        .then(this.getFeeds)
      return state.deleteIn([action.source, action.index])

    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new SourceStore(AppDispatcher);
export default instance;
