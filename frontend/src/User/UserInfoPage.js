import { Layout, Menu, Breadcrumb} from 'antd';
import React, { useState } from 'react';
import './UserInfoPage.css'
import { UserOutlined, TransactionOutlined, BookOutlined} from '@ant-design/icons';
import UserInfo from './UserInfo';
import Header from '../Layout/Header';
import '../Layout/Header.css'
import PostedAnimals from './PostedAnimals';
import TransactionHistory from './TransactionHistory';
import { withRouter } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';

const {Content, Sider } = Layout;

const UserInfoPage = (props) => {
    const [selectedKey, setSelectedKey] = useState(props.location.state.key)

    const switchComponent = (key) => {
        switch (key){
            case "1":
                return(<UserInfo />);
            case "2":
                return(<PostedAnimals key="1"/>);
            case "2.5":
                return(<PostedAnimals key="2"/>);
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
                            <SubMenu icon={<BookOutlined />} title="Posts">
                                <Menu.Item key="2">My Posted Animals</Menu.Item>
                                <Menu.Item key="2.5">My Favourite List</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3" icon={<TransactionOutlined />}>
                                Transaction History
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="right-container" style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content className="site-layout-background">
                            <div style = {{height:'100%', overflow :'auto'}}>
                                {switchComponent(selectedKey)}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    )
}

export default withRouter(UserInfoPage);