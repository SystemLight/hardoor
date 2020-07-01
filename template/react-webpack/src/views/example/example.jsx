import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {createSelector} from "reselect";
import EditTable from "../../component/editTable";
import RouteView from "../../routes/routeView";
import routes from "../../routes/routes";


const selector = createSelector(
    state => {
        return state.example;
    },
    example => {
        return example.aboutText;
    }
);

export function My(props) {

    return (
        <div>
            我的
        </div>
    );
}


export default function Example(props) {
    let dispatch = useDispatch();
    let aboutText = useSelector(selector);

    return (
        <div>
            {aboutText}
            <br/>
            <button onClick={(e) => {
                dispatch({type: "TEST_ABOUT"})
            }}>改变内容
            </button>
            <RouteView routes={routes.filter(value => value.id === "example")[0].subRoute}/>
        </div>
    );
}


const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export function ExampleEditTable(props) {

    return (
        <div>
            <EditTable data={originData}/>
        </div>
    );
}