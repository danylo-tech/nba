import {combineReducers} from 'redux';
import rcGlobal from '../reducers/rc_global';
import rcMatch from '../reducers/rc_match';

export default combineReducers({rcGlobal, rcMatch});
