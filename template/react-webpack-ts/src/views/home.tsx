import React, {ReactNode, useState} from "react";
import {Row, Col} from "antd";

export default function Home() {
    const [panel, setPanel] = useState<ReactNode>(null);

    const onClick = () => {
        setPanel(React.createElement(Row, {}, [
            React.createElement(Col, {span: 3, key: 1})
        ]));
    };

    return (
        <div>
            <div>{panel}</div>
            <button onClick={onClick}>增加自定义组件</button>
        </div>
    );
}
