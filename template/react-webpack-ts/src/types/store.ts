import {Dispatch} from "redux";

// reducer 存储纯函数类型定义
export type reducerActionKeysType = "DATE" | "OTHER";

export interface ReducerAction {
    type: reducerActionKeysType
}

export interface ReducerState {
    data: string
}

export type dispatchReducer = Dispatch<ReducerAction>;

export interface Reducers {
    reducer: ReducerState
}
