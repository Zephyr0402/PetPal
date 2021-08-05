import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { List, Button } from 'antd';
import ReactDOM from "react-dom";

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
    //const aid = props.aid;
    const [aid, setAid] = useState(-1);
    const [markerData, setMarkerData] = useState([]);
    

    useEffect(() => {
        console.log('testingggg')
        console.log(data); 
        const mData = [];
        console.log("aid is:", props.aid);
        if (props.aid > -1) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].address === data[props.aid].address) {
                    mData.push({
                        "name": data[i].name,
                        "aid": i,
                    });
                }
            }
            setMarkerData(mData);
            setAid(props.aid);
        }

    }, [props.aid, props.animalCardInfo]);

    // useEffect(() => {
    //     aid = -1;
    // }, [props.aid]);

    const marker2aid = (marker) => {
        for (let i in aid2marker) {
            if (aid2marker[i].props.position === marker.position) {
                return i;
            }
        }
    }

    const onMarkerClick = (marker) => {
        console.log('onMarkerClick');
        props.setDisplay(marker2aid(marker));
        setActiveMarker(marker);
        // setShowInfoWindow(true);
        
    }

    const onInfoWindowClose = (props) => {
        // if(showInfoWindow){
        //     setShowInfoWindow(false);
        // }
    }

    const onInfoWindowOpen = (props, e) => {
        const button = (
            <div>
                <List style={{ width: "100%" }}
                    itemLayout="horizontal"
                    dataSource={markerData}
                    renderItem={(item, index) => (
                        <List.Item className='marker-list-item' id={item.aid} style={{ width: "100%" }}>
                            <Button onClick={(e) => { console.log('button' + item.aid); props.setDisplay(item.aid) }} type="link" >{item.name}</Button>
                        </List.Item>
                    )}
                />

            </div>
            
        );
        ReactDOM.render(
            React.Children.only(button),
            document.getElementById("iwc")
        );
    }

    return (
        <Map
            containerStyle={mapStyles}
            google={props.google}
            zoom={14}
            initialCenter={{ lat: 49.26127572955761, lng: -123.23869115661624 }}
            center={activeMarker.position}
        >
            {
            data.map((ele, index) => {
                return <Marker
                    name={ele.name}
                    position={ele.position}
                    onClick={onMarkerClick}
                    ref={(marker) => aid2marker[index] = marker}
                />
            }
            )}
            {aid > -1 && 
                <InfoWindow
                    marker={
                        aid2marker[aid].marker
                    }
                    visible={true}
                onClose={onInfoWindowClose}
                onOpen={e => {
                    onInfoWindowOpen(props, e);
                }}
            >
                <div id="iwc">

                    {/* <List style={{ width: "100%" }}
                        itemLayout="horizontal"
                        dataSource={markerData}
                        renderItem={(item, index) => (
                            <List.Item className='marker-list-item' id={item.aid} style={{ width: "100%" }}>
                                <Button onClick={console.log("hey")} type="link" >{item.name}</Button>
                            </List.Item>
                        )}
                    /> */}
                </div>
            </InfoWindow>
            }
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'
})(AnimalMap);
