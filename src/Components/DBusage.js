import React, { Component } from "react";
import VizDataExtract from './VizDataExtract';
import DropdownBikeStation from './DropdownBikeStation'
import { Route } from 'react-router-dom'

class DBusage extends Component {
    constructor(props) {
        super(props);
        this.state = {stationNumber: 1};
        }
    
    
    stationFilter = (event) => {  
    this.setState({
        stationNumber : event.target.bikes.value
      })
    }
    
    render() {
        console.log(this.state.stationNumber)
        
        return (
            <div>
            <DropdownBikeStation stationFilter={this.stationFilter} />
            <VizDataExtract handleClick={this.handleClick}
            stations={this.state.stationNumber}/>

</div>
);
}
}

export default DBusage;