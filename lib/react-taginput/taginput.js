import './taginput.less';

import React, {useRef} from "react";


export default function TagInput(props) {
    let {value, onChange} = props;
    let input = useRef(null);

    return (
        <div className="tag-input" onClick={() => (input.current.focus())}>
            {value.map((v, index) => {
                return (<span key={index} className="tag">{v}<i onClick={() => {
                    onChange && onChange(value.filter((v, i) => (i !== index)));
                }}>×</i></span>);
            })}
            <input ref={input} type="text" onKeyDown={(e) => {
                if (e.key === "Enter" && onChange) {
                    let tag = e.target.value.trim();
                    if (tag) {
                        value.push(tag);
                        onChange([...value]);
                    }
                    e.target.value = "";
                }
            }}/>
        </div>
    );
}