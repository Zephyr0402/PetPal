import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './Map.css'


const mapStyles = {
    position: 'absolute',
    width: '62%',
    height: '90.5%'
};

var aid2marker = [];

const AnimalMap = (props) => {
   // const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const data = props.animalCardInfo;
    console.log("aid is:", props.aid);

    useEffect(() => {
        if (props.aid > -1) {
            aid2marker[props.aid].marker.click();
        }
    }, []);

    const marker2aid = (marker) => {
        for (let i in aid2marker) {
            if(aid2marker[i].props.position === marker.position){
                return i;
            }
        }
    }

    const onMarkerClick = (marker) => {
        props.setDisplay(marker2aid(marker));
        //setShowInfoWindow(true);
        setActiveMarker(marker);
    }

    const onInfoWindowClose = (props) => {
        // if(showInfoWindow){
        //     setShowInfoWindow(false);
        // }
    }

    return(
        <Map className = "map-container"
            containerStyle = {mapStyles}
            google={props.google}
            zoom={14}
            initialCenter={{lat:49.26127572955761, lng:-123.23869115661624}}
            center = {activeMarker.position}
        >
            {data.map((ele,index) =>
                <Marker
                    name = {ele.name}
                    position = {ele.position}
                    onClick={onMarkerClick}
                    ref = {(marker) => aid2marker[index] = marker}
                />
            )}
            <InfoWindow
                marker={
                    props.aid > -1 ?
                    aid2marker[props.aid].marker : null
                }
                visible={props.aid > -1}
                onClose={onInfoWindowClose}
            >
                <div className="map-thumbnail">
                    {props.aid > -1 ? <div><img alt={data[props.aid].name + " image"} src={data[props.aid].image}/></div> : <></>}
                    <div>
                        <h3>{props.aid > -1 ? data[props.aid].name + ": $" + data[props.aid].price : ""}</h3>
                        <p>{props.aid > -1 ? data[props.aid].address : ""}</p>
                    </div>
                </div>
            </InfoWindow>
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'})(AnimalMap);
