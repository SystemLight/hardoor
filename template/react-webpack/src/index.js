import './public.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch} from 'react-redux';

import store from "./store/store";
import Navigation from "./component/navigation/navigation";
import RouteView from "./routes/routeView";


function App(props) {
    // App组件为全局唯一组件，全局根组件
    let dispatch = useDispatch();

    return (
        <>
            <App2>asdfas</App2>
            <p>导航栏会改变内容面板</p>
            <button onClick={(e) => {
                dispatch({type: "RESET"})
            }}>重置内容
            </button>
            <br/><br/><br/>
            {/*导航组件*/}
            <Navigation/>
            {/*切换路由组件*/}
            <RouteView/>
        </>
    );
}

ReactDOM.render(
    // render中尽量不要放置其它组件或page，render中主要放置全局元组件
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('main')
);
