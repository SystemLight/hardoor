const ExportJsonExcel = require("js-export-excel");

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    Select, Form, Input, InputNumber, Row, Table, Button
} from "antd";
import * as antd from "antd/es";

function FullSelect(props) {
    return <Select style={{width: "100%"}} {...props}/>
}

function FInput(props) {
    let {name, label, hidden, disabled, type} = props;

    return (
        <Form.Item name={name} label={label} hidden={hidden}>
            <Input disabled={disabled} type={type}/>
        </Form.Item>
    )
}

function FInputNumber(props) {
    let {name, label, hidden, precision} = props;

    return (
        <Form.Item name={name} label={label} hidden={hidden}>
            <InputNumber style={{width: "100%"}} precision={precision}/>
        </Form.Item>
    )
}

function FTextarea(props) {
    let {name, label, hidden, rows} = props;

    return (
        <Form.Item name={name} label={label} hidden={hidden}>
            <Input.TextArea rows={rows}/>
        </Form.Item>
    )
}

function FSelect(props) {
    let {name, label, hidden, options} = props;

    return (
        <Form.Item name={name} label={label} hidden={hidden}>
            <Select style={{width: "100%"}} options={options}/>
        </Form.Item>
    )
}

function Component(props) {
    const {children} = props;

    return (
        <div>{children}</div>
    );
}

function TabledLayout(props) {
    const {children} = props;

    return (
        <Form>
            <Row>
                {children}
            </Row>
        </Form>
    );
}

function EditTable(props) {
    let {columns, data, editURL, tableTitle, loading} = props;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        setSelectedRowKeys([]);
    }, [data]);

    const rowClassName = (record, index) => {
        if (index % 2 !== 0) {
            return "odd";
        } else {
            return "";
        }
    };

    const exportExcel = () => {
        if (data.length === 0) {
            message.info('没有可导出的数据');
            return;
        }

        let exportData = [];
        if (selectedRowKeys.length === 0) {
            // 导出全部
            exportData = data;
        } else {
            // 导出部分
            exportData = data.filter(v => (selectedRowKeys.indexOf(v["key"]) !== -1));
        }

        let id = 1;
        let header = {"id": "编号"};
        let keys = [];
        let finalData = [];

        columns.forEach(c => {
            header[c["dataIndex"]] = c["title"]
            keys.push(c["dataIndex"]);
        });

        finalData.push(header);
        exportData.forEach(d => {
            let temp = {"id": id};
            keys.forEach(key => {
                temp[key] = d[key];
            });
            finalData.push(temp);
            id++;
        });

        let option = {
            fileName: "data",
            datas: [
                {
                    sheetData: finalData,
                }
            ]
        };

        new ExportJsonExcel(option).saveExcel();
    };

    const title = (currentPageData) => {
        return (
            <div className={"clearfix export-table-title"}>
                <p>{tableTitle || ""}</p>
                <p>
                    <Button type={"primary"} onClick={exportExcel}>导出</Button>
                </p>
            </div>
        );
    };

    const rowSelection = {
        type: "checkbox",
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    // region mergedColumns 合成列数据
    let mergedColumns = [
        {
            key: "id",
            dataIndex: "id",
            title: "编号",
            render: (text, record, index) => {
                return index + 1;
            },
        },
        ...columns,
        {
            key: 'edit',
            dataIndex: "edit",
            title: '编辑',
            render: (text, record) => (
                <Link to={`${editURL}${record["key"]}`} target={"_blank"}>
                    <Button type={"primary"}>编辑</Button>
                </Link>
            ),
        }
    ].map(v => {
        if (v.dataIndex === "id" || v.dataIndex === "edit") {
            return v;
        }
        return {
            ...v,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => {
                let stringA = a[v.dataIndex].toUpperCase();
                let stringB = b[v.dataIndex].toUpperCase();
                if (stringA < stringB) {
                    return -1;
                }
                if (stringA > stringB) {
                    return 1;
                }
                return 0;
            },
        }
    });
    // endregion

    const summary = (currentData) => {
        const getTotal = (data, index) => {
            let total = 0;
            data.forEach(d => {
                total += Number(d[index]);
            });
            return total;
        };
        return (
            <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>合计：</Table.Summary.Cell>
                {currentData.length === 0 ? undefined : (
                    columns.map(c => {
                        if (c["isTotal"]) {
                            return (
                                <Table.Summary.Cell key={c["key"]}>{
                                    getTotal(currentData, c["dataIndex"])
                                }</Table.Summary.Cell>
                            )
                        } else {
                            return (
                                <Table.Summary.Cell key={c["key"]}/>
                            )
                        }
                    })
                )}
            </Table.Summary.Row>
        );
    };

    return (
        <div style={{width: "100%", overflow: "hidden", marginTop: 15}}>
            <Table className={"advanced-table"} dataSource={data} columns={mergedColumns}
                   rowClassName={rowClassName} title={title} pagination={false}
                   rowSelection={rowSelection} scroll={{x: 'max-content'}} bordered={true}
                   tableLayout={"auto"} loading={loading} summary={summary}
            />
        </div>
    );
}

export default {
    ...antd,
    FullSelect,
    FInput,
    FInputNumber,
    FTextarea,
    FSelect,
    Component,
    TabledLayout,
    EditTable
}
