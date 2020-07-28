import React from "react";
import {Switch, Route} from "react-router-dom";

export default function RouteView(props) {
    const {routes} = props;

    return (
        <Switch>
            {routes ? routes.map((r) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Route {...r}/>
                );
            }) : ""}
        </Switch>
    );
}
