
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
 
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
//   {
//     name: "Test Marker",
//     position: { lat: 49.26895685710785, lng: -123.2481998864374 },
// address: "ExChange Student Residence"
//     }
const mapStyles = {
    position: 'absolute',
    width: '62%',
    height: '92%'
};

var aid2marker = [];
export class TestMapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          data: props.animalInfos,
        };
    }
    
    marker2aid(marker){
        for(let i in aid2marker){
            if(aid2marker[i].marker.position === marker.position){
                return i;
            }   
        }
    }

    onMarkerClick = (props, marker, e) =>{
      this.props.setDisplay(this.marker2aid(marker));
      this.setState({
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
      
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
        });
      }
    };

    componentDidMount(){
        if(this.props.aid > -1){
            aid2marker[this.props.aid].marker.click();
        }
    }

    render() {
        return (
            <Map
            containerStyle = {mapStyles}
            google={this.props.google}
            zoom={14}
            initialCenter={{lat:49.26127572955761, lng:-123.23869115661624}}
            center = {this.state.activeMarker.position}
            >
                {this.state.data.map((ele,index) => 
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
                        aid2marker[this.props.aid].marker : null
                    }
                    visible={this.props.aid > -1}
                    onClose={this.onClose}
                >
                    <div className = "hello">
                        <h3>{this.props.aid > -1 ? this.state.data[this.props.aid].name : ""}</h3>
                        <pre>{this.props.aid > -1 ? this.state.data[this.props.aid].address : ""}</pre>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC8w_bEe3IlzsbyjWJ96uOhlSADfrhh7gQ'})(TestMapContainer);
