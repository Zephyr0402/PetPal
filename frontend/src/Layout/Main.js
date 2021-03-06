import React, { useState, useEffect } from 'react';
import {Layout} from 'antd';
import {EnvironmentFilled, UnorderedListOutlined} from '@ant-design/icons';
import Header from './Header';
import UtilityView from '../AnimalList/UtilityView';
import AnimalCard from '../AnimalCard/AnimalCard'
import AnimalMap from '../AnimalMap/Map';
import Payment from "../Payment/Payment";
import { fetchAnimalList } from '../Services/fetchData';
import { withRouter } from 'react-router-dom';
import './Main.css'

const Main = (props) => {
    const [animalInfos, setAnimalInfos] = useState([]);
    const [display, setDisplay] = useState(-1);
    const [displayCheckout, setDisplayCheckout] = useState(false);
    const [curMarkerAid, setCurMarkerAid] = useState(-1);
    const [displayListResponsive, setDisplayListResponsive] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if(props.location.query !== undefined){
            var index = -1;
            for(let i = 0; i< animalInfos.length;i++){
                if(animalInfos[i].id === props.location.query.display){
                    index=i
                    break
                }
            }
            setDisplay(index)
        }
    }, [animalInfos, props.location.query])

    const setMyDisplay = (e) => {
        setCurMarkerAid(e);
        setDisplay(e);
    }

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
            setAnimalInfos(inboundAnimalInfo);
        });
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);

    }, [display]);


    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    const handleToggle = () => {
        setDisplayListResponsive(!displayListResponsive);
    };

        return (
            <Layout>
                <Header />
                <Layout>
                    <Layout.Sider className=
                        {windowSize.width > 750 || displayListResponsive ?
                            "aside-wrapper show-list" :
                            "aside-wrapper hide-list"}
                        width="38%">
                        {display <= -1 ?
                            <UtilityView animalInfos={animalInfos} setDisplay={setMyDisplay} /> :
                            displayCheckout ?
                                <Payment aid={display} setDisplay={setMyDisplay} setDisplayCheckout={setDisplayCheckout} animalInfos={animalInfos} /> :
                                <AnimalCard aid={display} animalCardInfo={animalInfos[display]} setDisplay={setMyDisplay} setDisplayCheckout={setDisplayCheckout} />}
                    </Layout.Sider>
                    <Layout className=
                        {windowSize.width > 750 || !displayListResponsive ?
                            "map-wrapper show-map" :
                            "map-wrapper hide-map"} >
                        <Layout.Content>
                            <AnimalMap aid={display} animalCardInfo={animalInfos} setDisplay={setMyDisplay} filterAnimalInBounds={filterAnimalInBounds} isDisplayListResponsive={displayListResponsive} setDisplayListResponsive={setDisplayListResponsive} />
                        </Layout.Content>
                    </Layout>
                </Layout>
                <div className="toggle-map-list-button" onClick={handleToggle}>
                    {displayListResponsive ? <EnvironmentFilled /> : <UnorderedListOutlined />}
                </div>
            </Layout>

        );
}

export default withRouter(Main);
