import React from "react";

import http from '../../request/http';


export default function HeadNav(props) {
    http.get("/").then(function (res) {
        console.log(res);
    });

    return (
        <div>
            <a href="#">导航主页</a>
        </div>
    );
}