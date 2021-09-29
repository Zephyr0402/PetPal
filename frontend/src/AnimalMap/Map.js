import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { List, Button } from 'antd';
import ReactDOM from "react-dom";
import './Map.css'

const mapStyles = {
    position: 'absolute',
    width: '62%',
    height: '91.5%'
};

const initialCenter = {
    lat: 49.26127572955761, lng: -123.23869115661624
};

var aid2marker = [];

const AnimalMap = (props) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [markerData, setMarkerData] = useState([]);
    const [data, setData] = useState([]);
    var markerEffect = null;

    useEffect(() => {
        setData(props.animalCardInfo)
        const mData = [];
        if (props.aid > -1) {
            if (aid2marker.length > props.aid) {
                if (aid2marker[props.aid] !== null) {
                    if (aid2marker[props.aid].marker !== markerEffect) {
                        props.google.maps.event.trigger(aid2marker[props.aid].marker, 'click');
                    }
                }
            }

            for (var i = 0; i < data.length; i++) {
                if (data[props.aid] === undefined) {
                    continue;
                }
                if (!('address' in data[i]) || !('address' in data[props.aid])) {
                    continue;
                }
                try {
                    if (data[i].address === undefined || data[props.aid].address === undefined) {
                        continue;
                    }
                    if (data[i].address === data[props.aid].address) {
                        mData.push({
                            "name": data[i].name,
                            "aid": i,
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
                
            }
            setMarkerData(mData);
            setShowInfoWindow(true);
        } else {
            setShowInfoWindow(false);
        }


    }, [props.aid, props.animalCardInfo, data, props.google.maps.event, markerEffect]);

    const marker2aid = (marker) => {
        for (let i in aid2marker) {
            if (aid2marker[i].props.position === marker.position) {
                return i;
            }
        }
    }

    const onMarkerClick = (marker) => {
        markerEffect = marker;
        setActiveMarker(marker);
        props.setDisplay(marker2aid(marker));
        setShowInfoWindow(true);
    }

    const onInfoWindowClose = (props) => {
        if (showInfoWindow) {
            setShowInfoWindow(false);
        }
    }

    const onIdle = async (mapProps, map) => {
        const bounds = map.getBounds();
        await props.filterAnimalInBounds(bounds);
    }

    const onInfoWindowOpen = (props, e) => {
        const button = (
            <div>
                <List style={{ width: "100%" }}
                    itemLayout="horizontal"
                    dataSource={markerData}
                    renderItem={(item, index) => (
                        <List.Item className='marker-list-item' id={item.aid} style={{ width: "100%", padding: 0 }}>
                            <Button onClick={(e) => { props.setDisplay(item.aid) }} type="link" >{item.name}</Button>
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
        <Map className="map-container"
            containerStyle={mapStyles}
            google={props.google}
            zoom={14}
            initialCenter={initialCenter}
            center={activeMarker.position}
            onIdle={onIdle}
        >
            {
                data.map((ele, index) => {
                    return <Marker
                        key={ele.id}
                        name={ele.name}
                        position={ele.position}
                        onClick={onMarkerClick}
                        ref={(marker) => {
                            if (marker === null) {
                                aid2marker[index] = null;
                                return;
                            }
                            aid2marker[index] = marker
                        }
                        }
                        icon="Petpal_icon_32x32.png"
                    />
                })
            }
            {(props.aid > -1 || showInfoWindow) &&
                <InfoWindow
                    marker={
                        props.aid > -1 ? aid2marker[props.aid].marker : null
                    }
                    visible={props.aid > -1 && showInfoWindow}
                    onClose={onInfoWindowClose}
                    onOpen={(e) => {
                        onInfoWindowOpen(props, e);
                    }
                    }
                >
                    <div id="iwc" />
                </InfoWindow>
            }
        </Map>
    )
}

export default GoogleApiWrapper({
    //apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'
    apiKey : 'AIzaSyBgao-aq8zyAUnJUCg335-tYIDAI5AJeAc'
})(AnimalMap);
