import {Dispatcher} from 'flux';

export const ClusterDispatcher = new Dispatcher();
export const dispatch = ClusterDispatcher.dispatch.bind(ClusterDispatcher);
