import React from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";


const selector = createSelector(
    state => {
        return state.example;
    },
    state => {
        return state;
    }
);

export default function Home(props) {
    let data = useSelector(selector);

    return (
        <div>
            首页
        </div>
    );
}