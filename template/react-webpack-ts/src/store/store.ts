import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import reducer, {reducerState} from "@/store/reducer/reducer";

export type Reducers = {
    reducer: reducerState
};

export default createStore(combineReducers<Reducers>({
    reducer: reducer
}), applyMiddleware(thunk));
