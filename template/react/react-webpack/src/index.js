import './public.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

import RouteList from "./routes/routeList";
import store from "./store/store";
import HeadNav from "./component/headNav/headNav";


function App(props) {
    return (
        <HeadNav/>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <RouteList/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('main')
);


