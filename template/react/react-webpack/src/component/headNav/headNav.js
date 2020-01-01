import React from "react";
import {NavLink} from "react-router-dom";

import routes from "../../routes/routes";
import http from '../../request/http';


export default function HeadNav(props) {
    http.get("/").then(function (res) {
        console.log("[headNav组件] 代理请求数据测试：", res);
    });

    return (
        <div>
            <NavLink to="/events/123"
                     isActive={(match, location) => {
                         return false
                     }}
            >导航主页</NavLink>
        </div>
    );
}