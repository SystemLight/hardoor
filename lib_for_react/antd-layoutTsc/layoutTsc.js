import './layoutTsc.less';

import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';


export default function LayoutTSC(props) {

    return (
        <Layout className="tsc">
            <Layout.Header>
                <div className="app-logo"/>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Layout.Header>
            <Layout>
                <Layout.Sider width={200}>
                    <Menu mode="inline">
                        <Menu.SubMenu key="sub1" title={(<span>sub1</span>)}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" title={(<span>sub2</span>)}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub3" title={(<span>sub3</span>)}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
                <Layout className="content">
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout.Content>
                        Content
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}