const _state = {
    data: "当前时间"
};

export default function reducer(state = _state, action) {
    switch (action.type) {
        case "DATE":
            const date = new Date();
            return {
                data: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            };
        case "OTHER":
            return {
                data: "其它数据"
            };
        default:
            return state;
    }
}
