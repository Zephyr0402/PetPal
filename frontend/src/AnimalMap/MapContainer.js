import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const data = [
  {
    name : "Jerry",
    position:{lat:49.26127572955761, lng:-123.23869115661624},
  },
  {
    name : "Yuki",
    position:{lat:49.25727572955761, lng:-123.24769115661624},
  },
  {
    name : "Milly",
    position:{lat:49.25127572955761, lng:-123.23769115661624},
  },
  {
    name : "Ruby",
    position:{lat:49.25127572955761, lng:-123.24769115661624},
  }
]
var aid2marker = [];
export class MapContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      };
  }

  componentDidMount(){
    console.log(aid2marker);
  }

  onMarkerClick = (props, marker, e) =>{  
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
    
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          zoom = {13}
        >
          {data.map((ele,index) => 
            <Marker
              name = {ele.name}
              position = {ele.position}
              onClick = {this.onMarkerClick}
              ref = {(marker) => aid2marker[index] = marker}
            />
          )}
          <InfoWindow
            marker={
              this.props.aid > -1 ? 
              aid2marker[this.props.aid].marker : null}
            visible={this.props.aid > -1}
            onClose={this.onClose}
          >
            <div className = "hello">
              <p>{this.props.aid > -1 ? data[this.props.aid].name : ""}</p>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
            
    );

}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgao-aq8zyAUnJUCg335-tYIDAI5AJeAc'
})(MapContainer);