const ExportJsonExcel = require("js-export-excel");
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Row, Table, Button, message, Form, Input} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";

export {default as Affix} from 'antd/es/affix';
export {default as Anchor} from 'antd/es/anchor';
export {default as AutoComplete} from 'antd/es/auto-complete';
export {default as Alert} from 'antd/es/alert';
export {default as Avatar} from 'antd/es/avatar';
export {default as BackTop} from 'antd/es/back-top';
export {default as Badge} from 'antd/es/badge';
export {default as Breadcrumb} from 'antd/es/breadcrumb';
export {default as Button} from 'antd/es/button';
export {default as Calendar} from 'antd/es/calendar';
export {default as Card} from 'antd/es/card';
export {default as Collapse} from 'antd/es/collapse';
export {default as Carousel} from 'antd/es/carousel';
export {default as Cascader} from 'antd/es/cascader';
export {default as Checkbox} from 'antd/es/checkbox';
export {default as Col} from 'antd/es/col';
export {default as Comment} from 'antd/es/comment';
export {default as ConfigProvider} from 'antd/es/config-provider';
export {default as DatePicker} from 'antd/es/date-picker';
export {default as Descriptions} from 'antd/es/descriptions';
export {default as Divider} from 'antd/es/divider';
export {default as Dropdown} from 'antd/es/dropdown';
export {default as Drawer} from 'antd/es/drawer';
export {default as Empty} from 'antd/es/empty';
export {default as Form} from 'antd/es/form';
export {default as Grid} from 'antd/es/grid';
export {default as Input} from 'antd/es/input';
export {default as InputNumber} from 'antd/es/input-number';
export {default as Layout} from 'antd/es/layout';
export {default as List} from 'antd/es/list';
export {default as message} from 'antd/es/message';
export {default as Menu} from 'antd/es/menu';
export {default as Mentions} from 'antd/es/mentions';
export {default as Modal} from 'antd/es/modal';
export {default as Statistic} from 'antd/es/statistic';
export {default as notification} from 'antd/es/notification';
export {default as PageHeader} from 'antd/es/page-header';
export {default as Pagination} from 'antd/es/pagination';
export {default as Popconfirm} from 'antd/es/popconfirm';
export {default as Popover} from 'antd/es/popover';
export {default as Progress} from 'antd/es/progress';
export {default as Radio} from 'antd/es/radio';
export {default as Rate} from 'antd/es/rate';
export {default as Result} from 'antd/es/result';
export {default as Row} from 'antd/es/row';
export {default as Select} from 'antd/es/select';
export {default as Skeleton} from 'antd/es/skeleton';
export {default as Slider} from 'antd/es/slider';
export {default as Space} from 'antd/es/space';
export {default as Spin} from 'antd/es/spin';
export {default as Steps} from 'antd/es/steps';
export {default as Switch} from 'antd/es/switch';
export {default as Table} from 'antd/es/table';
export {default as Transfer} from 'antd/es/transfer';
export {default as Tree} from 'antd/es/tree';
export {default as TreeSelect} from 'antd/es/tree-select';
export {default as Tabs} from 'antd/es/tabs';
export {default as Tag} from 'antd/es/tag';
export {default as TimePicker} from 'antd/es/time-picker';
export {default as Timeline} from 'antd/es/timeline';
export {default as Tooltip} from 'antd/es/tooltip';
export {default as Typography} from 'antd/es/typography';
export {default as Upload} from 'antd/es/upload';
export {default as version} from 'antd/es/version';

import {ImageBoxStyle} from "@/styles";

// type columns=Array< {
//     "isTotal": boolean,
//     "dataIndex": string,
//     "key": string,
//     "title": string
// }>;

/*
    可编辑表格
 */
export function EditTable(props) {
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
        if (!data || data.length === 0) {
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

/*
    图片容器
 */
export function ImageWrap(props) {
    let {src, onClick: trigger, href} = props;

    const onClick = () => {
        trigger && trigger(href);
    }

    return (
        <ImageBoxStyle onClick={onClick}>
            <img src={src} alt="图片"/>
        </ImageBoxStyle>
    )
}

/*
    带按钮输入框
 */
export function InputButton(props) {
    let {value, onClick, onChange, field} = props;

    const btnClick = () => {
        onClick && onClick(field);
    };

    return (
        <Input
            addonAfter={<EllipsisOutlined style={{cursor: "pointer"}} onClick={btnClick}/>}
            value={value}
            onChange={({target: {value}}) => (onChange(field, value))}
        />
    )
}

/*
    组件容器
 */
export function Container(props) {
    let {children} = props;

    return (
        <Form colon={false} labelCol={{span: 5}}>
            <Row gutter={[15, 0]} className={"container-panel"}>
                {children}
            </Row>
        </Form>
    );
}
