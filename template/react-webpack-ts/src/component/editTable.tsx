import React, {useState} from "react";
import {Table, Input, Popconfirm} from "antd";

export interface Item {
    key: string,
    name: string,
    age: number,
    address: string,
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    record: Item,
    dataIndex: string,
    title: any,
    editing: boolean,
    children: React.ReactNode
}

export interface EditableProps {
    data: Item[];
}

function EditableCell({record, dataIndex, title, editing, children, ...restProps}: EditableCellProps) {
    return (
        <td {...restProps}>
            {editing ? (<Input/>) : (children)}
        </td>
    );
}

export default function EditTable(props: EditableProps) {
    const {data} = props;

    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: Item) => {
        return record.key === editingKey;
    };

    const cancel = () => {
        setEditingKey("");
    };

    const edit = (record: Item) => {
        setEditingKey(record.key);
    };

    const components = {
        body: {
            cell: EditableCell
        }
    };

    const columns = [
        {
            title: "姓名",
            dataIndex: "name",
            key: "name",
            editable: true
        },
        {
            title: "年龄",
            dataIndex: "age",
            key: "age",
            editable: true
        },
        {
            title: "地址",
            dataIndex: "address",
            key: "address",
            editable: true
        },
        {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            render: (_: any, record: Item) => {
                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <a href="javascript:" style={{marginRight: 8}}>保存</a>
                        <Popconfirm title="是否取消?" onConfirm={cancel}><a>取消</a></Popconfirm>
                    </span>
                ) : (<a onClick={() => edit(record)}>编辑</a>);
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => (
                {
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record)
                }
            )
        };
    });

    return (
        <Table components={components} dataSource={data} columns={mergedColumns}/>
    );
}
