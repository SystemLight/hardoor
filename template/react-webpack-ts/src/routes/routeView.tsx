import React from "react";
import {Switch, Route} from "react-router-dom";

import {RoutesBasic} from "./routes";

export type RouteViewProps = {
    routes?: RoutesBasic[]
}

export default function RouteView(props: RouteViewProps) {
    let {routes} = props;


    return (
        <Switch>
            {routes ? routes.map(r => {
                return (
                    <Route key={r.id} path={r.path} exact={r.exact} component={r.component}/>
                )
            }) : ""}
        </Switch>
    );
}
