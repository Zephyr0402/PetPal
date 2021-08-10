import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { List, Button } from 'antd';
import ReactDOM from "react-dom";
import './Map.css'

const mapStyles = {
    position: 'absolute',
    width: '62%',
    height: '90.5%'
};

const initialCenter = {
    lat: 49.26127572955761, lng: -123.23869115661624
};

var aid2marker = [];

const AnimalMap = (props) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [markerData, setMarkerData] = useState([]);
    var data = props.animalCardInfo;

    useEffect(() => {
        data = props.animalCardInfo;
        const mData = [];
        if (props.aid > -1) {
            if (aid2marker[props.aid].marker !== activeMarker) {
                props.google.maps.event.trigger(aid2marker[props.aid].marker, 'click');
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].address === undefined || data[props.aid].address === undefined) {
                    continue;
                }
                if (data[i].address === data[props.aid].address) {
                    mData.push({
                        "name": data[i].name,
                        "aid": i,
                    });
                }
            }
            setMarkerData(mData);
            setShowInfoWindow(true);
        } else {
            setShowInfoWindow(false);
        }


    }, [props.aid, props.animalCardInfo]);

    const marker2aid = (marker) => {
        for (let i in aid2marker) {
            if (aid2marker[i].props.position === marker.position) {
                return i;
            }
        }
    }

    const onMarkerClick = (marker) => {
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
        console.log('onIdle');
        const bounds = map.getBounds();
        await props.filterAnimalInBounds(bounds);
    }

    const onInfoWindowOpen = (props, e) => {
        console.log('onInfoWindowOpen');
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
            {
                console.log('test infowindow: ' + showInfoWindow + props.aid)
            }
            {showInfoWindow &&
                <InfoWindow
                    marker={
                        props.aid > -1 ? aid2marker[props.aid].marker : null
                    }
                    // visible={(e) => { console.log('visible'); return props.aid > -1; }}
                    visible={props.aid > -1}
                    onClose={onInfoWindowClose}
                    onOpen={(e) => {
                        console.log(e);
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
    apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'
})(AnimalMap);
