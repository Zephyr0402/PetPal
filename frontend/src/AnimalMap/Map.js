import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { List, Button } from 'antd';
import ReactDOM from "react-dom";

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
            console.log('mData', mData);
            setAid(props.aid);
            setMarkerData(mData);
        } else {
            setAid(props.aid);
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
        console.log('onMarkerClick');
        console.log(marker2aid(marker));
        props.setDisplay(marker2aid(marker));
        setActiveMarker(marker);
        // setShowInfoWindow(true);
    }

    const onInfoWindowClose = (props) => {
        // if(showInfoWindow){
        //     setShowInfoWindow(false);
        // }
    }

    const onCenterMoved = async (mapProps, map) => {
        console.log('onCenterMoved');
        // const bounds = map.getBounds();
        // console.log(bounds);
        // props.filterAnimalInBounds(bounds);
    }

    const onIdle = async (mapProps, map) => {
        console.log('onIdle');
        const bounds = map.getBounds();
        await props.filterAnimalInBounds(bounds);
    }

    const onZoomChanged = async (mapProps, map) => {
        console.log('onZoomChanged');
        // const bounds = map.getBounds();
        // await props.filterAnimalInBounds(bounds);
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
        <Map
            containerStyle={mapStyles}
            google={props.google}
            zoom={14}
            initialCenter={initialCenter}
            center={activeMarker.position}
            onDragend={onCenterMoved}
            onZoomChanged={onZoomChanged}
            onIdle={onIdle}
        >
            {
                data.map((ele, index) => {
                    return <Marker
                        name={ele.name}
                        position={ele.position}
                        onClick={onMarkerClick}
                        ref={(marker) => {
                            if (marker === null) {
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
                console.log('test infowindow' + aid)
            }
            {
                console.log(aid > -1 && aid2marker[aid].marker ? aid2marker[aid].marker : 'no marker')
            }
            {aid > -1 && aid2marker[aid].marker &&
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
                    <div id="iwc"></div>
                </InfoWindow>
            }
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDnMJlodY_mrnG1k--Ol-Ocm9bWgaJF18k'
})(AnimalMap);
