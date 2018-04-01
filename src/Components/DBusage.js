import React, { Component } from "react";
import DropdownBikeStation from './DropdownBikeStation'
class DBusage extends Component {
    constructor(props) {
        super(props);
        this.state = {stationNumber: undefined, fromDate: undefined, toDate: undefined};
        }
    
    
    stationFilter = (event) => {
    const stationNumber = event.target.bikes.value
    const fromDate = event.target.from.value
    const toDate = event.target.to.value
    this.setState({
        stationNumber : stationNumber, fromDate: fromDate, toDate: toDate
      })
    }
    
    render() {
        console.log(this.state.stationNumber)
        
        return (
            <div>
            <DropdownBikeStation stationFilter={this.stationFilter} />

</div>
);
}
}

export default DBusage;