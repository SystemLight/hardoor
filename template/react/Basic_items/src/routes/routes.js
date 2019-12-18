import React from "react";

import Home from "../page/home/home";
import View404 from "../page/status/view404";


const routes = [
    {
        title: "首页",
        path: "/",
        exact: true,
        render(...props) {
            return <Home {...props}/>
        },
        isNav: true
    }, {
        title: "404",
        path: "",
        exact: true,
        render(...props) {
            return <View404 {...props}/>
        },
        isNav: false
    }
];

export default routes;