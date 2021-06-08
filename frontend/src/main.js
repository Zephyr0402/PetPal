import React from 'react';
import MapContainer from './map/MapContainer'
import {Layout} from 'antd';
import Header from './Header';
import AnimalCard from './AnimalCard';

const Main = (props) => {
    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider width = "38%" style = {{backgroundColor:'white'}}>
                    <AnimalCard/>
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