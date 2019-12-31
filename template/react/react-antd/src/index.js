import './public.css';
import zhCN from 'antd/es/locale/zh_CN';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {ConfigProvider} from "antd";

import RouteList from "./routes/routeList";
import store from "./store/store";
import HeadNav from "./component/headNav/headNav";


function App(props) {
    return (
        <>
            <HeadNav/>
        </>

    );
}

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <App/>
                <RouteList/>
            </BrowserRouter>
        </ConfigProvider>
    </Provider>
    , document.getElementById('main')
);


