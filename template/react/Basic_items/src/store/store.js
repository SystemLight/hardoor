import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import list from "./reducer/list";


export default createStore(combineReducers({
    list
}), applyMiddleware(thunk));
