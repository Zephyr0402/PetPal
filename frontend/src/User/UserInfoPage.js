import { Layout, Menu, Breadcrumb} from 'antd';
import './UserInfoPage.css'
import { UserOutlined, TransactionOutlined, SmileOutlined} from '@ant-design/icons';
import UserInfo from './UserInfo';
import Header from '../Layout/Header';
import '../Layout/Header.css'
const {Content, Sider } = Layout;
function UserInfoPage(){
    return(
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
                        <UserInfo />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default UserInfoPage;