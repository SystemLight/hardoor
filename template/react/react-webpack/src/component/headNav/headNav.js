import React from "react";
import {NavLink} from "react-router-dom";

import routes from "../../routes/routes";
import http from '../../request/http';


export default function HeadNav(props) {
    console.log(routes);
    http.get("/").then(function (res) {
        console.log(res);
    });

    return (
        <div>
            <NavLink to="/events/123"
                     isActive={(match, location) => {
                         console.log(match, location);
                         return false
                     }}
            >导航主页</NavLink>
        </div>
    );
}