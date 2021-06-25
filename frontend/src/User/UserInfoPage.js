import { Layout, Menu, Breadcrumb} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './UserInfoPage.css'
import { UserOutlined, TransactionOutlined, SmileOutlined} from '@ant-design/icons';
import UserInfo from './UserInfo';
import Header from '../Layout/Header';
import '../Layout/Header.css'
import PostedAnimals from './PostedAnimals';
import TransactionHistory from './TransactionHistory';

const {Content, Sider } = Layout;

function UserInfoPage(){
    return(
        <Router>
            <Layout>
                <Header/>
                <Layout>
                    <Sider width={300}>
                    {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                Basic Information
                                <Link to="/user" />
                            </Menu.Item>
                            <Menu.Item key="2" icon={<SmileOutlined />}>
                                Posted Animals
                                <Link to="/postedanimals" />
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TransactionOutlined />}>
                                Transaction History
                                <Link to="/transactions" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="right-container" style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content className="site-layout-background">
                            <Route exact path="/user" component={UserInfo} />
                            <Route path="/postedanimals" component={PostedAnimals} />
                            <Route path="/transactions" component={TransactionHistory} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    )
}

export default UserInfoPage;