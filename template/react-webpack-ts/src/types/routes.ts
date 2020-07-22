import {ComponentType} from "react";

// 路由类型文件定义
// 定义规范，type定义类型小写字母开头，结尾需要有Type进行命名
// 尽量使用接口进行类型定义，接口定义名称大写字母开头

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

export interface RouteViewProps {
    routes?: RoutesBasic[]
}
