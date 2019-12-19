import React from "react";

import Home from "../page/home/home";
import View404 from "../page/status/view404";


const routes = [
    {
        title: "首页",
        path: "/",
        to: "/",
        isDynamic: true,
        exact: true,
        isNav: true,
        render(...props) {
            return <Home {...props}/>
        },
        active(match, location) {
            return true;
        }
    }, {
        title: "404",
        path: "",
        to: "",
        isDynamic: false,
        exact: false,
        isNav: false,
        render(...props) {
            return <View404 {...props}/>
        },
        active(match, location) {
            return false;
        }
    }
];

export default routes;