import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { fetchData } from '../Services/BikeService'
import { searchBike } from '../Services/BikeService'
import { BusData } from '../Services/BusService'
import { GoogleApiWrapper } from 'google-maps-react'
import MapRendering from './MapRendering'
import MapForm from './MapForm'

class MapContainer extends Component {

  state = {
    overallData: {}
  }

  componentDidMount = () => {
    fetchData().then((json) => {
        var businfo = require('../data/nearestbus.json');
        var luasinfo =require('../data/nearestluas.json');
        window.store = {stations: json, busData: businfo, luasData: luasinfo}
        this.setState({overallData: window.store})
    });
  }
      
  onFilter = (event) => {
    window.searchresult = searchBike(event)
    fetchData()
      .then((json) => {
        var selectedbikeobject = json.filter(function( obj ) {
                                  return obj.number == window.searchresult.selectedstation;
                                });
        window.searchbike = {stations: selectedbikeobject, busData: window.searchresult.businfo, luasData: window.searchresult.luasinfo}
        this.setState({overallData: window.searchbike})
      })
  }
 
  render() {
    return (
        <div className="MapContainer">
        <div className="wrapper">
          <MapForm onFilter={this.onFilter} />
          <Route path="/" render={(props) => <MapRendering google={this.props.google} stations={this.state.overallData} {...props}/>}/>
        </div>
        <br/>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As',
  libraries: ['visualization']
})(MapContainer)

