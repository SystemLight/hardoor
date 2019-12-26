import React from "react";

import Home from "../page/home/home";
import View404 from "../page/status/view404";


export const navRoutes = [];

const routes = [
    {
        path: "/",
        exact: true,
        render(...props) {
            return <Home {...props}/>
        }
    }, {
        path: "",
        exact: false,
        render(...props) {
            return <View404 {...props}/>
        }
    }
];

export default routes;