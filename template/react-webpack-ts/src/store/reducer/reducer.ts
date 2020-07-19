import {Dispatch} from "redux";

export type reducerType = "TEST_ABOUT" | "TEST_OTHER" | string;

export type reducerAction = {
    type: reducerType
};

export type reducerState = {
    example: string
};

export type DispatchReducerAction = Dispatch<reducerAction>;

export default function reducer(state: reducerState = {
    example: "test"
}, action: reducerAction) {
    switch (action.type) {
        case "TEST_ABOUT":
            return {
                example: new Date().getTime().toString()
            };
        case "TEST_OTHER":
            return {
                example: "TEST_ABOUT"
            };
        default:
            return {
                example: "test"
            };
    }
}
