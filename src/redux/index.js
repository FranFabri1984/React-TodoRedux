import { legacy_createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import rootReducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const initialState = {};

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composeEnhancers = composeFunc(applyMiddleware(thunk));


const store = legacy_createStore(rootReducers(), initialState, composeEnhancers);

export default store;