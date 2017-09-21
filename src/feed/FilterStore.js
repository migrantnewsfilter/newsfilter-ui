import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {AppDispatcher, dispatch} from '../AppDispatcher';


class FilterStore extends ReduceStore {

  getInitialState() {
    const map = Immutable.Map({ days: 10, relevance: true });
    return map
  }

  reduce (state, action) {
    switch (action.type) {
    case 'filter/days':
      return state.set('days', action.days)
    case 'filter/relevance':
      return state.set('relevance', action.relevance)
    default:
      return state;
    }
  }
}

// Export a singleton instance of the store
const instance = new FilterStore(AppDispatcher);
export default instance;
