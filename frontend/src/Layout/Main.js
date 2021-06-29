import React, { useState, useEffect } from 'react';
import MapContainer from '../AnimalMap/MapContainer'
import {Layout} from 'antd';
import Header from './Header';
import UtilityView from '../AnimalList/UtilityView';
import AnimalCard from '../AnimalCard/AnimalCard'
import TestMapContainer from '../AnimalMap/TestMap';
import Payment from "../Payment/Payment";
import { fetchAnimalList } from '../Services/fetchData';

const Main = (props) => {
    const [display, setDisplay] = useState(-1);
    const [displayCheckout, setDisplayCheckout] = useState(false);
    const [animalInfos, setAnimalInfos] = useState([]);

    const setMyDisplay = (e) => {
        setDisplay(e);
    }
    
    useEffect(() => {
        // fetch animal info from backend
        fetchAnimalList().then(res => {
            console.log("fetchAnimalList1", res.animalInfos);
            setAnimalInfos(res.animalInfos);
        });
    }, [display]);
    
    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider width = "38%" style = {{backgroundColor:'white'}}>
                    {  display === -1 ?
                        <UtilityView animalInfos={ animalInfos } setDisplay = {setMyDisplay}/> :
                        displayCheckout ?
                            <Payment aid={display} setDisplayCheckout = {setDisplayCheckout}/> :
                            <AnimalCard aid = {display} setDisplay = {setMyDisplay} setDisplayCheckout={setDisplayCheckout}/> }
                </Layout.Sider>
                <Layout>
                    <Layout.Content>
                        <TestMapContainer aid = {display} setDisplay = {setMyDisplay}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Main;
