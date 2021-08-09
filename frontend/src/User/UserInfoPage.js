import { Layout, Menu, Breadcrumb} from 'antd';
import React, { useState, useEffect } from 'react';
import './UserInfoPage.css'
import { UserOutlined, TransactionOutlined, BookOutlined} from '@ant-design/icons';
import UserInfo from './UserInfo';
import Header from '../Layout/Header';
import '../Layout/Header.css'
import PostedAnimals from './PostedAnimals';
import TransactionHistory from './TransactionHistory';
import { withRouter } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';
import { checkUUID } from '../Services/userService';

const {Content, Sider } = Layout;

const UserInfoPage = (props) => {
    //props.match.params.uuid
    // console.log(props);
    var initialKey = props.location.query == undefined ? "1": props.location.query.key;
    const [selectedKey, setSelectedKey] = useState(initialKey);
    const [isMe, setIsMe] = useState(true)
    // console.log(selectedKey);

    // check whether the params.uuid matches current user
    useEffect(async () => {
        await checkUUID(props.match.params.uuid)
        .then((res) => {
            // console.log(res)
            setIsMe(res);
        })
    }, []);

    const switchComponent = (key) => {
        switch (key){
            case "1":
                return(<UserInfo uuid={props.match.params.uuid} isMe={isMe} />);
            case "2":
                return(<PostedAnimals filter="1" uuid={props.match.params.uuid} />);
            case "2.5":
                return(<PostedAnimals filter="2" />);
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
                    <Sider className='sideBar' width={300}>
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
                                {isMe? <Menu.Item key="2.5">My Favourite List</Menu.Item> : null}
                            </SubMenu>
                            {isMe? 
                                <Menu.Item key="3" icon={<TransactionOutlined />}>
                                Transaction History
                                </Menu.Item> : null
                            }
                        </Menu>
                    </Sider>
                    <Layout className="right-container">
                        <Breadcrumb className='breadcrumb' style={{ margin: '16px 0' }}>
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