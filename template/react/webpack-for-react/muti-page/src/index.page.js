import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from "./store/store";
import HeadNav from "./component/headNav/headNav";


function App(props) {
    return (
        <>
            <HeadNav/>
            <a href={"./about.html"}>关于</a>
        </>
    );
}

ReactDOM.render(
    <Provider store={store}>
        asdf
        <App/>
    </Provider>
    , document.getElementById('main')
);