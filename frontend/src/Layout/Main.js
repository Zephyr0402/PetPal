import React, { useState } from 'react';
import MapContainer from '../AnimalMap/MapContainer'
import {Layout} from 'antd';
import Header from './Header';
import UtilityView from '../AnimalList/UtilityView';
import AnimalCard from '../AnimalCard/AnimalCard'

const Main = (props) => {
    const [display, setDisplay] = useState(-1); 

    const setMyDisplay = (e) => {
        setDisplay(e);
    }

    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider width = "38%" style = {{backgroundColor:'white'}}>
                    {  display === -1 ? <UtilityView setDisplay = {setMyDisplay}/> : <AnimalCard aid = {display} setDisplay = {setMyDisplay}/> }
                </Layout.Sider>
                <Layout>
                    <Layout.Content>
                        <MapContainer aid = {display}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Main;