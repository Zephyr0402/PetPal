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
    const [animalInfos, setAnimalInfos] = useState([]);
    const [display, setDisplay] = useState(-1);
    const [displayCheckout, setDisplayCheckout] = useState(false);
    const [curMarkerAid, setCurMarkerAid] = useState(-1);

    const setMyDisplay = (e) => {
        setCurMarkerAid(e);
        setDisplay(e);
    }

    // const getOneAnimalInfo = () => {
    //     setCurMarkerAid(0);
    //     fetch ...............
    //     setAnimalInfo(res)
    // }

    const filterAnimalInBounds = async (bounds) => {
        if (curMarkerAid > -1) {
            setCurMarkerAid(-1);
            return;
        }
        setDisplay(-2);
        setAnimalInfos([]);
        fetchAnimalList().then(res => {
            var inboundAnimalInfo = [];
            for (let i = 0; i < res.length; i++) {
                const position = {
                    "lat": Number(res[i].position.lat),
                    "lng": Number(res[i].position.lng)
                }
                if (bounds.contains(position)) {
                    inboundAnimalInfo.push(res[i]);
                }
            }
            console.log('filterAnimalInBounds');
            console.log(inboundAnimalInfo);
            setAnimalInfos(inboundAnimalInfo);
        });
    }

    // useEffect(() => {
    //     if (display === -1) {
    //         fetchAnimalList().then(res => {
    //             setAnimalInfos(res);
    //             if (props.location.query != undefined) {
    //                 for (var i = 0; i < res.length; i++) {
    //                     if (res[i].id == props.location.query.display) {
    //                         setDisplay(i)
    //                         break
    //                     }
    //                 }
    //             }
    //         });
    //     }
    // }, [display]);

    return(
        <Layout>
            <Header/>
            <Layout>
                <Layout.Sider width = "38%" style = {{backgroundColor:'white'}}>
                    {  display <= -1 ?
                        <UtilityView animalInfos={animalInfos} setDisplay={setMyDisplay}/> :
                        displayCheckout ?
                            <Payment aid={display} setDisplay = {setMyDisplay} setDisplayCheckout={setDisplayCheckout} animalInfos={animalInfos}/> :
                            <AnimalCard aid={display} animalCardInfo={animalInfos[display]} setDisplay={setMyDisplay} setDisplayCheckout={setDisplayCheckout}/> }
                </Layout.Sider>
                <Layout>
                    <Layout.Content>
                        <AnimalMap aid={display} animalCardInfo={animalInfos} setDisplay={setMyDisplay} filterAnimalInBounds={filterAnimalInBounds}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default withRouter(Main);
