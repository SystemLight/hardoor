import React from "react";
import {
    Container, Col, Input,
    InputNumber, Checkbox,
    Form, Select, DatePicker,
    Typography, ImageWrap, InputButton,
    Button
} from "@/lib";

export default function Trial(p) {
    let {onChange, data, props} = p

    return (
        <Container>
            <Col span={8}>
                <Form.Item label={"标题标题题"}>
                    <Input value={data["a"]}
                           onChange={({target: {value}}) => (onChange("a", value))} {...props["a"]} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题标题题"}>
                    <InputNumber style={{width: "100%"}} value={data["b"]}
                                 onChange={(val) => (onChange("b", val))} {...props["b"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <Input.TextArea value={data["c"]}
                                    onChange={({target: {value}}) => (onChange("c", value))} {...props["c"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <Checkbox checked={data["d"]} children={"选择框"}
                              onChange={({target: {checked}}) => (onChange("d", checked))} {...props["d"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <Select value={data["e"]} onChange={(val) => (onChange("e", val))} {...props["e"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <DatePicker value={data["f"]} style={{width: "100%"}}
                                onChange={(val) => (onChange("f", val))} {...props["f"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <DatePicker.RangePicker value={data["g"]} style={{width: "100%"}}
                                            onChange={(val) => (onChange("g", val))} {...props["g"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={"标题"}>
                    <InputButton field={"h"} value={data["h"]} onChange={onChange} {...props["h"]}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label={" "}>
                    <Typography.Text {...props["i"]}>{data["i"]}</Typography.Text>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label={""}>
                    <ImageWrap src={data["j"]} {...props["j"]}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Button style={{width: "100%"}} {...props["k"]}>按钮</Button>
            </Col>
        </Container>
    );
}
