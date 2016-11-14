import {Dispatcher} from 'flux';

export const ArticleDispatcher = new Dispatcher();
export const dispatch = ArticleDispatcher.dispatch.bind(ArticleDispatcher);
