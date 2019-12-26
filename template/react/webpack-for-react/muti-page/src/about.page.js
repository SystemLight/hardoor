import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from "./store/store";


console.log("about");

function App(props) {
    return (
        <>
            关于界面
        </>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('main')
);