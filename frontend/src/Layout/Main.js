import React, { useState, useEffect } from 'react';
import {Layout} from 'antd';
import Header from './Header';
import UtilityView from '../AnimalList/UtilityView';
import AnimalCard from '../AnimalCard/AnimalCard'
import AnimalMap from '../AnimalMap/Map';
import Payment from "../Payment/Payment";
import { fetchAnimalList } from '../Services/fetchData';
import { withRouter } from 'react-router-dom'

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
            console.log("fetchAnimalList", res);
            setAnimalInfos(res);
            console.log(typeof (animalInfos));
        });
    }, [display]);

    console.log(props)
    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider width = "38%" style = {{backgroundColor:'white'}}>
                    {  display === -1 ?
                        <UtilityView animalInfos={ animalInfos } setDisplay = {setMyDisplay}/> :
                        displayCheckout ?
                            <Payment aid={display} setDisplay = {setMyDisplay} setDisplayCheckout={setDisplayCheckout} animalInfos={animalInfos}/> :
                            <AnimalCard aid={display} animalCardInfo={ animalInfos[display] } setDisplay = {setMyDisplay} setDisplayCheckout={setDisplayCheckout}/> }
                </Layout.Sider>
                <Layout>
                    <Layout.Content>
                        <AnimalMap aid={display} animalCardInfo={animalInfos} setDisplay = {setMyDisplay}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default withRouter(Main);
