import React, { Component } from 'react';
import MapContainer from './Components/MapContainer'
import {BrowserRouter as Router } from 'react-router-dom'
import { fetchData } from './Services/BikeService'
import './App.css';

class App extends Component { 
 render() {
    return (
      <Router>
      <div className="App">
        <MapContainer />
      </div>
      </Router>
    );
  }
  
}

export default App;
