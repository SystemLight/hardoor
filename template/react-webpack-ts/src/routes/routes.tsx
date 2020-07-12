import React, {ReactElement, ComponentType} from "react";
import {Redirect} from "react-router-dom";

import Example, {My} from "../views/example";

export interface RoutesBasic {
    id: string,
    title: string,
    path: string | Array<string>,
    exact?: boolean,
    component: ComponentType
}

export interface ParentRoutesBasic extends RoutesBasic {
    subRoute?: Array<RoutesBasic>
}

export type routesType = Array<ParentRoutesBasic>;

export let notFound: string = "/404";

// 获取子路由
export function subRoute(name: string) {
    let result = routes.find(v => {
        return v.id === name;
    });

    if (result) {
        return result.subRoute;
    }

    return [];
}

// 高阶组件，用于异步加载组件，这样可以让不同路由地址的组件分开加载
export function dynamic(imp: Promise<{ default: ComponentType }>, Loading?: ReactElement): ComponentType {


    return () => {
        return (
            <React.Suspense fallback={Loading || <></>}>
                {React.createElement(React.lazy(() => imp), {})}
            </React.Suspense>
        );
    }
}

// 404页面
export function NotFoundPage() {

    return (
        <div>
            404:Not Found
        </div>
    );
}

const routes: routesType = [
    {
        id: "index",
        title: "主页",
        path: "/",
        exact: true,
        component: () => (<Redirect to={"/home"}/>),
    },
    {
        id: "home",
        title: "主页",
        path: "/home",
        exact: true,
        component: dynamic(import(/* webpackChunkName: "home" */'../views/home'))
    },
    {
        id: "example",
        title: "示例",
        path: "/example",
        component: Example,
        subRoute: [
            {
                id: "example-my",
                title: "示例: 我的",
                path: "/example/my",
                exact: true,
                component: My,
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
