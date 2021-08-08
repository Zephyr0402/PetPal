import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { InfoWindow } from "google-maps-react";

//Citation: https://stackoverflow.com/questions/53615413/how-to-add-a-button-in-infowindow-with-google-maps-react
const CustomizedInfoWindow = (props) => {
    const infoWindowRef = React.createRef();
    const contentElement = document.createElement(`div`);
    useEffect(() => {
        ReactDOM.render(React.Children.only(props.children), contentElement);
        infoWindowRef.current.infowindow.setContent(contentElement);
    }, [props.children]);
    return <InfoWindow ref={infoWindowRef} {...props} />;
};

export default CustomizedInfoWindow;
