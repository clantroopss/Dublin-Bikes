import React, { Component } from 'react';
/*import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";*/
import {BrowserRouter  as Router, Route, Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import MapContainer from './Components/MapContainer'
import DBusage from "./Components/DBusage";
import NewStationInstallation from "./Components/NewStationInstallation";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component { 
 render() {
    return (
        <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Sustainable City Management</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/" >
                Dublin Bikes Load Equalizer
              </NavItem>
              <NavItem eventKey={2} href="/dbusage">
                Dublin Bikes Usage
              </NavItem>
              <NavItem eventKey={3} href="/dbprediction">
                Dublin Bikes Usage Prediction
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <Router>
            <div className="App">
              <Route exact path="/" component={MapContainer} />
              <Route path="/dbusage" component={DBusage} />
              <Route path="/dbprediction" component={NewStationInstallation} />
            </div>
        </Router>
        </div>
      /*<div>
        <h2>Repos</h2>

        { add some links }
        <ul>
          <li><Link to="/">Dublin Bikes Load Equalizer</Link></li>
          <li><Link to="/dbusage">Dublin Bikes Usage</Link></li>
          <li><Link to="/dbprediction">Dublin Bikes Usage Prediction</Link></li>
        </ul>

      </div>*/
    /*<HashRouter>
        <div>
          <ul className="header">
            <li><a aria-current="true" href="#" class="active"><b>Sustainable City Management</b></a></li>
            <li><NavLink exact  to="/"><a aria-current="true" class="active">Dublin Bikes Load Equalizer</a></NavLink></li>
            <li><NavLink to="/dbusage"><a aria-current="true" class="active">Dublin Bikes Usage</a></NavLink></li>
            <li><NavLink to="/dbprediction"><a aria-current="true" class="active">Dublin Bikes Usage Prediction</a></NavLink></li>
          </ul>
          <div className="App">
            <Route exact path="/" component={MapContainer}/>
            <Route path="/dbusage" component={DBusage}/>
            <Route path="/dbprediction" component={NewStationInstallation}/>
          </div>
        </div>
     </HashRouter>*/
    );
  }
}

export default App;