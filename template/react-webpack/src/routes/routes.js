import React from "react";

import Home from "../views/home/home.jsx";
import About from "../views/about/about.jsx";
import View404 from "../views/status/view404.jsx";


const routes = [
    {
        id: "home", // 唯一ID名称
        title: "首页", // 导航显示的内容
        isNav: true, // flag用于判断该项是否加入导航
        to: "/",
        path: "/",
        exact: true,
        component: Home,
        render(...props) {
            return <Home {...props}/>
        }
    },
    {
        id: "about",
        title: "关于",
        isNav: true,
        to: "/about",
        path: "/about",
        exact: true,
        component: About,
        render(...props) {
            return <About {...props}/>
        }
    },
    {
        id: "view404",
        title: null,
        isNav: false,
        to: null,
        path: null,
        exact: false,
        component: View404,
        render(...props) {
            return <View404 {...props}/>
        }
    }
];


export default routes;