import React, { Component } from "react";
import { fetchPredictions } from '../Services/PredictionService';
import DropdownBikeStation from './DropdownBikeStation'
 
class NewStationInstallation extends Component {
constructor(props){
        super(props);
        this.state = 
            {
            allData : []
            };
    }

    componentDidMount = () => {
        fetchPredictions().then((json) => {
            this.setState({allData: json})
        });
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
 
export default NewStationInstallation;