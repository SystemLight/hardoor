import React, {useRef} from "react";

import './pagination.css';


export default function Pagination(props) {
    const ulElement = useRef(null);

    let {currentPage, perPageData, totalData, maxDisplayPage, changeBtn} = props;

    let totalPage = Math.ceil(totalData / perPageData);
    maxDisplayPage = maxDisplayPage || 5;
    let liList = [];

    if (totalPage <= maxDisplayPage + 2) {
        for (let i = 1; i <= totalPage; i++) {
            liList.push(<li key={i} className={"btn " + (i === currentPage ? "active" : "")}>{i}</li>);
        }
    } else {
        liList.push(<li key={1} className={"btn " + (1 === currentPage ? "active" : "")}>{1}</li>);
        if (currentPage >= maxDisplayPage) {
            liList.push(<li key="prev" className="btn prev">...</li>);
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
            liList.push(<li key={i} className={"btn " + (i === currentPage ? "active" : "")}>{i}</li>);
        }

        if (currentPage <= totalPage - maxDisplayPage) {
            liList.push(<li key="next" className="btn next">...</li>);
        }
        liList.push(<li key={totalPage} className={"btn " + (totalPage === currentPage ? "active" : "")}>
            {totalPage}</li>);
    }

    return (
        <div className="pagination-wrap">
            <ul className="pagination" ref={ulElement} onClick={function (e) {
                if (Array.prototype.some.call(ulElement.current.querySelectorAll(".btn"), (v) => {
                    return v === e.target;
                })) {
                    changeBtn && changeBtn({target: e.target, totalPage});
                }
            }}>
                <li key="prevBtn" className="btn">上一页</li>
                {liList}
                <li key="nextBtn" className="btn">下一页</li>
            </ul>
        </div>
    );
}