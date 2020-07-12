import React, {memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createSelector} from "reselect";

import EditTable, {Item} from "../component/editTable";
import RouteView from "../routes/routeView";
import {subRoute} from "../routes/routes";
import {DispatchReducerAction, reducerState} from "../store/reducer/reducer";
import {Reducers} from "../store/store";


const selector = createSelector<Reducers, reducerState, string>(
    state => {
        return state.reducer;
    },
    reducer => {
        return reducer.example;
    }
);

export let My = memo(function () {
    console.log("my update")

    return (<div>example: 当前时间</div>);
}, () => true);

export default function Example() {
    let dispatch = useDispatch<DispatchReducerAction>();
    let exampleText = useSelector(selector);

    const onClick = () => {
        dispatch({type: "TEST_ABOUT"});
    }


    return (
        <div>
            redux : {exampleText}
            <br/>
            <button onClick={onClick}>改变内容</button>
            <RouteView routes={subRoute("example")}/>
        </div>
    );
}

const originData: Item[] = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export function ExampleEditTable() {


    return (
        <div>
            <EditTable data={originData}/>
        </div>
    );
}
