import React, {useState} from "react";
import moment from 'moment';

import Trial from "@/component";
import {EditTable} from "@/lib";

const columns = [{
    "isTotal": false,
    "dataIndex": "日期",
    "key": "日期",
    "title": "日期"
}];

const attribute = {
    "e": {options: [{label: "a", value: "a"}]}
}

export default function Home() {
    const [data, setData] = useState({
        "f": moment(),
        "g": [moment().startOf('month'), moment().endOf('month')]
    });

    return (
        <div style={{width: 1080, margin: "0 auto", paddingTop: 15}}>
            <Trial data={data} props={attribute} onChange={(key, val) => {
                data[key] = val;
                setData({...data});
            }}/>
            <EditTable columns={columns}/>
        </div>
    );
}
