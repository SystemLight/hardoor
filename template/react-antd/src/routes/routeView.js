import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "./routes";


export default function RouteView(props) {
    return (
        <Switch>
            {routes.map(item => {
                return <Route key={item.id} path={item.path} exact={item.exact} render={item.render}/>
            })}
        </Switch>
    );
}