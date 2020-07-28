import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createSelector} from "reselect";

import reducer from "@/store/reducer/reducer";

/*
    创建一个redux数据存储库
 */
export default createStore(combineReducers({
    reducer: reducer
}), applyMiddleware(thunk));

/*
    捕获reducer纯函数的data内容
 */
export const reducerDataSelector = createSelector(
    (reducers) => {
        return reducers.reducer;
    },
    (state) => {
        return state.data;
    }
);
