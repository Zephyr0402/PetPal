import React from 'react';
import MapContainer from './map/MapContainer'
import {Layout} from 'antd';
import Header from './Header';

const Main = (props) => {
    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider>
                </Layout.Sider>
                <Layout>
                    <Layout.Content>
                        <MapContainer/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Main;