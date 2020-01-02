import React from "react";

import Home from "../page/home/home";
import View404 from "../page/status/view404";


const routes = [
    {
        to: "/",
        path: "/",
        isNav: true,
        title: "首页",
        exact: true,
        render(...props) {
            return <Home {...props}/>
        }
    },
    {
        isNav: false,
        path: "",
        exact: false,
        render(...props) {
            return <View404 {...props}/>
        }
    }
];


export default routes;