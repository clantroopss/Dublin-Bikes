import React, { Component } from 'react';
import MapContainer from './Components/MapContainer'
import DBusage from "./Components/DBusage";
import NewStationInstallation from "./Components/NewStationInstallation";
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


class App extends Component { 
 render() {
    return (
    <HashRouter>
        <div>
          <h1>SUSTAINABLE CITY MANAGEMENT</h1>
          <ul className="header">
            <li><NavLink exact  to="/"><a aria-current="true" href="#/stuff" class="active">DB Load Equalizer</a></NavLink></li>
            <li><NavLink to="/dbusage"><a aria-current="true" href="#/stuff" class="active">DB Usage</a></NavLink></li>
            <li><NavLink to="/newstationinstallations"><a aria-current="true" href="#/stuff" class="active">New Station Installation</a></NavLink></li>
          </ul>
          <div className="App">
            <Route exact path="/" component={MapContainer}/>
            <Route path="/dbusage" component={DBusage}/>
            <Route path="/newstationinstallations" component={NewStationInstallation}/>
          </div>
        </div>
     </HashRouter>
      /*<Router>
      <div className="App">
        <MapContainer />
      </div>
      </Router>*/
    );
  }
}

export default App;
