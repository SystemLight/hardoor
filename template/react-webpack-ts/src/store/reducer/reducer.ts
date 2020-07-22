import {ReducerState, ReducerAction} from "@/types/store";

export default function reducer(state: ReducerState = {
    data: "test"
}, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "DATE":
            return {
                data: new Date().getTime().toString()
            };
        case "OTHER":
            return {
                data: "其它数据"
            };
        default:
            return state;
    }
}
