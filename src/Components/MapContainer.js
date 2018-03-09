import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { fetchData } from '../Services/BikeService'
import { GoogleApiWrapper } from 'google-maps-react'
import MapRendering from './MapRendering'

class MapContainer extends Component {

  state = {
    stations: []
  }
  componentDidMount = () => {
    fetchData()
      .then((json) => {
        this.setState({ stations: json} )
      })
  }
 
  render() {
    return (
      <div className="MapContainer">
        <h1>🌐 Bike Map - Team 14</h1>
        <div className="wrapper">
          <Route path="/" render={(props) => <MapRendering google={this.props.google} stations={this.state.stations} {...props}/>}/>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As',
  libraries: ['visualization']
})(MapContainer)

