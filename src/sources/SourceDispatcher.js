import {Dispatcher} from 'flux';

export const SourceDispatcher = new Dispatcher();
export const dispatch = SourceDispatcher.dispatch.bind(SourceDispatcher);
