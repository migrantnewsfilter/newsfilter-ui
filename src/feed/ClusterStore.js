import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppDispatcher, dispatch} from '../AppDispatcher';


class ClusterStore extends ReduceStore {

  getInitialState() {
    return null
  }

  reduce (state, action) {
    switch (action.type) {
    case 'cluster/highlight':
      return action.cluster;

    default:
      return state;
    }
  }
}


// Export a singleton instance of the store
const instance = new ClusterStore(AppDispatcher);
export default instance;
