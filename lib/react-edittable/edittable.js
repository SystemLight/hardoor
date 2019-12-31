import './edittable.less';
import './pagination.less';

import React, {useEffect, useRef, useState} from "react";


export function Pagination(props) {
    let {currentPage, totalPage, maxDisplayPage, onClick} = props;
    maxDisplayPage = maxDisplayPage || 5;

    const ulElement = useRef(null);

    let liList = [];
    if (totalPage <= maxDisplayPage + 2) {
        for (let i = 1; i <= totalPage; i++) {
            liList.push(<li key={i} className={"page-btn " + (i === currentPage ? "active" : "")}>{i}</li>);
        }
    } else {
        liList.push(<li key={1} className={"page-btn " + (1 === currentPage ? "active" : "")}>{1}</li>);
        if (currentPage > maxDisplayPage) {
            liList.push(<li key="prev" className="page-btn prev">...</li>);
        }

        let startPage, endPage;
        if (currentPage < maxDisplayPage) {
            startPage = 2;
            endPage = 2 + maxDisplayPage;
        } else if (currentPage > totalPage - maxDisplayPage) {
            startPage = totalPage - maxDisplayPage;
            endPage = totalPage;
        } else {
            startPage = currentPage - Math.floor(maxDisplayPage / 2);
            endPage = startPage + maxDisplayPage;
        }

        for (let i = startPage; i < endPage; i++) {
            liList.push(<li key={i} className={"page-btn " + (i === currentPage ? "active" : "")}>{i}</li>);
        }

        if (currentPage <= totalPage - maxDisplayPage) {
            liList.push(<li key="next" className="page-btn next">...</li>);
        }
        liList.push(<li key={totalPage} className={"page-btn " + (totalPage === currentPage ? "active" : "")}>
            {totalPage}</li>);
    }

    return (
        <div className="pagination-wrap">
            <ul className="pagination" ref={ulElement} onClick={function (e) {
                if (Array.prototype.some.call(ulElement.current.querySelectorAll(".page-btn"), (v) => {
                    return v === e.target;
                })) {
                    onClick && onClick({target: e.target});
                }
            }}>
                <li key="prevBtn" className="page-btn">上一页</li>
                {liList}
                <li key="nextBtn" className="page-btn">下一页</li>
            </ul>
        </div>
    );
}

function EditThead(props) {
    let {title, onResizeDown} = props;

    return (
        <thead>
        <tr>
            <th>
                <span>#</span>
            </th>
            {title.map((col, index) => {
                return (
                    <th key={col.key}>
                        <span>{col.name}</span>
                        <span className="resizable" onMouseDown={(e) => {
                            onResizeDown && onResizeDown({index, startX: e.clientX});
                        }}/>
                    </th>
                )
            })}
            <th>
                <span>操作</span>
            </th>
        </tr>
        </thead>
    )
}

function EditTbody(props) {
    let {title, value, onDelete, onChange} = props;

    return (
        <tbody>
        {value.map((row, rowIndex) => {
            return (
                <tr key={row.id}>
                    <td><span>{rowIndex + 1}</span></td>
                    {title.map((col, colIndex) => {
                        return (
                            <EditCell key={col.key} Data={{row, col, colIndex}} onChange={onChange}/>
                        )
                    })}
                    <td><span className="delete" onClick={() => {
                        onDelete && onDelete({row, rowIndex});
                    }}>删除</span></td>
                </tr>
            )
        })}
        </tbody>
    )
}

function EditCell(props) {
    let {Data, onChange} = props;
    let {row, col, colIndex} = Data;

    let [isEdit, setIsEdit] = useState(false);
    let inputDom = useRef(null);

    useEffect(() => {
        if (isEdit) {
            inputDom.current.select();
        }
    }, [isEdit]);

    return (
        <td onClick={(e) => (setIsEdit(true))} className={isEdit ? "edit-active" : ""}>
            <div className={"column column-" + colIndex}>
                {isEdit ? (<input ref={inputDom} type="text" value={row[col.key]}
                                  onChange={() => {
                                      onChange && onChange(Data);
                                  }}
                                  onBlur={(e) => (setIsEdit(false))}
                    />)
                    : (<span>{row[col.key]}</span>)
                }
            </div>
        </td>
    )
}

export default function EditTable(props) {
    let {title, value, onDelete, onChange} = props;

    let [widths, setWidths] = useState(Array(title.length).fill(0));
    let wrap = useRef(null);
    let isMount = useRef(false);

    useEffect(() => {
        let colWidth = (wrap.current.clientWidth - 150 - title.length * 32) / title.length;
        setWidths(w => ([...w.fill(colWidth)]));
        isMount.current = true;
    }, [title]);

    return (
        <div className="edit-table" ref={wrap}>
            <style>
                {
                    widths.map((v, i) => {
                        return `.column.column-${i}{width: ${v}px;}`;
                    })
                }
            </style>
            <table>
                <EditThead title={title}
                           onResizeDown={(e) => {
                               resizeCol(e, widths, setWidths);
                           }}/>
                <EditTbody title={title} value={value}
                           onChange={onChange} onDelete={onDelete}/>
            </table>
        </div>
    );
}

function resizeCol(downE, widths, setWidths) {
    let startX = downE.startX;

    function move(e) {
        widths[downE.index] += e.clientX - startX;
        setWidths([...widths]);
        startX = e.clientX;
    }

    function up() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up)
}