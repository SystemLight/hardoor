import React from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";


const selector = createSelector(
    state => {
        console.log(state);
        return state.example;
    },
    state => {
        console.log(state);
        return state;
    }
);

export default function Home(props) {
    let data = useSelector(selector);
    console.log(data);

    return (
        <div>
            首页
        </div>
    );
}