import React from 'react';

import Pagination from "./component/react-pagination/";


export default function App() {
    return (
        <div>
            <Pagination currentPage={1} totalData={77} perPageData={5}
                        onClickBtn={(e) => {
                            console.log(e);
                            console.log("改变currentPage的值，来进行变化")
                        }}/>
        </div>
    );
}