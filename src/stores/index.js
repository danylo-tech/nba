import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

import rootReducer from '../reducers/index';

const storeEnhancers = compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
