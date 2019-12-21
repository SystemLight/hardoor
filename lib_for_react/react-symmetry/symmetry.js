import './symmetry.less';

import React, {useState} from "react";


function SymmetryExhibit(props) {
    let {title,data, onClick} = props;

    return (
        <div>
            <div className="symmetry-group-header">
                {title}
            </div>
            <div className="symmetry-group-content">
                {data.map((v, index) => {
                    return (
                        <div className="symmetry-group-item" key={index}>
                            <img src={v.src} alt="预览" onClick={() => {
                                onClick && onClick(v.src);
                            }}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function Symmetry(props) {
    let [imgData, setImgData] = useState({
        "组一": [
            {src: "http://lisys.xyz/static/img/spt%20(1).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(2).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(3).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(4).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(5).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(6).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(7).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(8).jpg"},
        ],
        "组二": [
            {src: "http://lisys.xyz/static/img/spt%20(1).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(2).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(3).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(4).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(5).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(6).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(7).jpg"},
            {src: "http://lisys.xyz/static/img/spt%20(8).jpg"},
        ],
    });
    let [nowSrc, setNowSrc] = useState("");

    return (
        <div className="symmetry">
            <div className="symmetry-sidebar">我是侧边栏</div>
            <div className="symmetry-show">
                {nowSrc ? [<img key="show-img" src={nowSrc} alt="主图" onClick={() => {
                    window.open(nowSrc, "_blank");
                }}/>, <i key="show-close" className="close" onClick={() => (setNowSrc(""))}>×</i>] : ""}
            </div>
            <div className="symmetry-control">
                {Object.keys(imgData).map((v) => {
                    return (
                        <SymmetryExhibit key={v} title={v} data={imgData[v]} onClick={(e) => {
                            setNowSrc(e);
                        }}/>)
                })}
            </div>
        </div>
    );
}