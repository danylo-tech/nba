import {combineReducers} from 'redux';
import rcGloabl from '../reducers/rc_global';
import rcMatch from '../reducers/rc_match';

export default combineReducers({rcGloabl, rcMatch});
