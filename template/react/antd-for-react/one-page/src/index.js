import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

import App from "./app";
import RouteList from "./routes/routeList";
import store from "./store/store";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <RouteList/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('main')
);


