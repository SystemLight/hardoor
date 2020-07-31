import React from "react";
import {Redirect, useHistory} from "react-router-dom";

// 404：URL地址
export const notFound = "/404";

// 根据父路由id，索引出子路由
export function subRoute(routeKey) {
    const result = routes.find((p) => {
        return p.key === routeKey;
    });

    if (result) {
        return result.subRoute;
    }

    return [];
}

// 高阶组件，用于异步加载组件，这样可以让不同路由地址的组件分开加载
export function dynamic(imp, Loading) {
    return () => {
        return (
            <React.Suspense fallback={Loading || <></>}>
                {React.createElement(React.lazy(() => imp), {})}
            </React.Suspense>
        );
    };
}

// 404页面
export function NotFoundPage() {
    return (
        <div>
            404:Not Found
        </div>
    );
}

// 点击返回上一级路由组件
export function BackLastPage(props) {
    const {children} = props;

    const rHistory = useHistory();

    const onClick = () => {
        rHistory.goBack();
    };

    return (
        <a onClick={onClick}>
            {children}
        </a>
    );
}

// 路由表
const routes = [
    {
        key: "index",
        title: "主页",
        path: "/",
        exact: true,
        component: () => (<Redirect to={"/home"}/>)
    },
    {
        key: "home",
        title: "主页",
        path: "/home",
        exact: true,
        component: dynamic(import(/* webpackChunkName: "home" */"../views/home"))
    },
    {
        key: "notFound",
        title: "未发现",
        path: ["*", "/404"],
        component: NotFoundPage
    }
];

export default routes;
