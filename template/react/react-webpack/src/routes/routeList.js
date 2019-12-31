import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "./routes";


export default function RouteList(props) {
    return (
        <Switch>
            {routes.map((item, index) => {
                return <Route key={index} path={item.path} exact={item.exact} render={item.render}/>
            })}
        </Switch>
    );
}