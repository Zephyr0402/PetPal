import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    position: 'absolute',
    width: '62%',
    height: '92%'
};

// const data = [
//     {
//       name : "Jerry",
//       position:{lat:49.26127572955761, lng:-123.23869115661624},
//       address: "2725 Osoyoos Cres\nVancouver\nBC V6T 1X7\nCanada"
//     },
//     {
//       name : "Yuki",
//       position:{lat:49.25727572955761, lng:-123.24769115661624},
//       address:"6328 Larkin Dr\nVancouver\nBC V6T 2K2\nCanada"
//     },
//     {
//       name : "Milly",
//       position:{lat:49.25127572955761, lng:-123.23769115661624},
//       address: "3461 Ross Dr\nVancouver\nBC V6T 1W5\nCanada"
//     },
//     {
//       name : "Ruby",
//       position:{lat:49.25127572955761, lng:-123.24769115661624},
//       address: "6804 SW Marine Dr\nVancouver\nBC V6T 1Z1\nCanada"
//     }
//   ]

var aid2marker = [];

const AnimalMap = (props) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const data = props.animalCardInfo;
    //const inputEl = useRef(null);

    useEffect(() => {
        //console.log("test");
        //console.log(data);
        if(props.aid > -1){
            aid2marker[props.aid].marker.click();
        }
    },[])

    const marker2aid = (marker) => {
        console.log(marker);
        for (let i in aid2marker) {
            if(aid2marker[i].props.position === marker.position){
                return i;
            }
        }
    }

    const onMarkerClick = (marker) => {
        console.log(marker)
        console.log("marker");
        console.log(marker2aid(marker));
        props.setDisplay(marker2aid(marker));
        setShowInfoWindow(true);
        setActiveMarker(marker);
    }

    const onInfoWindowClose = (props) => {
        if(showInfoWindow){
            setShowInfoWindow(false);
        }
    }

    return(
        <Map
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
                    onClick = {onMarkerClick}
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
                <div className = "hello">
                    <h3>{props.aid > -1 ? data[props.aid].name : ""}</h3>
                    <pre>{props.aid > -1 ? data[props.aid].address : ""}</pre>
                </div>
            </InfoWindow>
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'})(AnimalMap);
