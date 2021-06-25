import { Layout, Menu, Breadcrumb} from 'antd';
import React, { useState } from 'react';
import './UserInfoPage.css'
import { UserOutlined, TransactionOutlined, SmileOutlined} from '@ant-design/icons';
import UserInfo from './UserInfo';
import Header from '../Layout/Header';
import '../Layout/Header.css'
import PostedAnimals from './PostedAnimals';
import TransactionHistory from './TransactionHistory';

const {Content, Sider } = Layout;

function UserInfoPage(){
    const [selectedKey, setSelectedKey] = useState("1")

    const switchComponent = (key) => {
        switch (key){
            case "1":
                return(<UserInfo />);
            case "2":
                return(<PostedAnimals />);
            case "3":
                return(<TransactionHistory />);
            default:
                break;
        }
    }

    return(
            <Layout>
                <Header/>
                <Layout>
                    <Sider width={300}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={selectedKey}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick = {(e) => setSelectedKey(e.key)}
                        >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                Basic Information
                            </Menu.Item>
                            <Menu.Item key="2" icon={<SmileOutlined />}>
                                Posted Animals
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TransactionOutlined />}>
                                Transaction History
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="right-container" style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content className="site-layout-background">
                            {switchComponent(selectedKey)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    )
}

export default UserInfoPage;