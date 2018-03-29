import React, { Component } from "react";
import { fetchPredictions } from '../Services/PredictionService';
 
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
        var alldata = this.state.allData;
        console.log(alldata)        
        return (
            <div>
                <div className="App">

                </div>				
            </div>
        );
    }
}
 
export default NewStationInstallation;