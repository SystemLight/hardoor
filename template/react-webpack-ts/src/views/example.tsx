import React, {memo} from "react";
import {useSelector, useDispatch} from "react-redux";

import {dispatchReducer} from "@/types/store";
import {reducerDataSelector} from "@/store";
import {subRoute} from "@/routes";
import RouteView from "@/routes/routeView";
import {RectDiv} from "@/styles";

export const My = memo(function () {
    console.log("my update");

    return (<RectDiv>example: 不随父组件更新</RectDiv>);
}, () => true);

export default function Example() {
    const dispatch = useDispatch<dispatchReducer>();
    const data = useSelector(reducerDataSelector);

    const onClick = () => {
        dispatch({type: "DATE"});
    };

    return (
        <div>
            redux : {data}
            <br/>
            <button onClick={onClick}>改变内容</button>
            <RouteView routes={subRoute("example")}/>
        </div>
    );
}
