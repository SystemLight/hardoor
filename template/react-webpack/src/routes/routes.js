import React from "react";
import {Redirect} from "react-router-dom";

import Home from "../views/home/home";
import {My} from "../views/example/example";


export let notFound = "/404";

export function dynamic(imp, Loading) {
    // 高阶组件，用于异步加载组件，这样可以让不同路由地址的组件分开加载
    let Com = React.lazy(() => imp);
    Loading = Loading || <></>;
    return () => {
        return (
            <React.Suspense fallback={Loading}>
                <Com/>
            </React.Suspense>
        );
    }
}

export function RedirectDefaultPage() {
    // 重定向到默认页面
    return (
        <Redirect to={"/home"}/>
    )
}

export function Redirect404() {
    // 重定向到404页面当中
    return (
        <Redirect to={notFound}/>
    )
}

export function NotFoundPage() {
    // 404页面
    return (
        <div>
            404:Not Found
        </div>
    );
}

const routes = [
    {
        id: "index",
        title: "主页",
        path: "/",
        component: RedirectDefaultPage,
        exact: true,
    },
    {
        id: "home", // 子路由homeRoutes
        title: "主页",
        path: "/home",
        exact: true,
        component: Home,
    },
    {
        id: "example",
        title: "举例",
        path: "/example",
        component: dynamic(import(/* webpackChunkName: "example" */'../views/example/example')),
        subRoute: [
            {
                id: "home-my",
                title: "我的",
                path: "/example/my",
                component: My,
                exact: true,
            }
        ]
    },
    {
        id: "notFound",
        title: "未发现",
        path: ["*", "/404"],
        component: NotFoundPage
    }
];

export default routes;