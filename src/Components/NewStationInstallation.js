import React, { Component } from "react";
import { fetchPredictionsDay } from '../Services/PredictionService';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService';
import {LineChart} from 'react-easy-chart';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
require('react-select/dist/react-select.min.css');


 
class NewStationInstallation extends Component {
constructor(props){
        super(props);
        this.state = 
            {
               predAllStation : undefined 
            };
    }
    getSelectValue(val) {
        return (this.state.selectValue === '') ? val : this.state.selectValue;
    }
    onSelectChange = (value) => {
        this.setState({ selectValue:value });
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if(event.target.bikes && event.target.bikes.value){
            if(window.predictionDayEntireObject) {
                var prefetchedpred = fetchPredictionsDay(parseInt(event.target.bikes.value));
                this.setState({predAllStation: prefetchedpred})
            } else {
                fetchPredictionsDay(parseInt(event.target.bikes.value)).then((json) => {
                    this.setState({predAllStation: json})
                });
            }
        }
    }
    componentDidMount = () => {
         bikeInfo()
          .then((json) => {
            this.setState({ bikeinfo: json} )
        })
    }
        
    render() {
        var predallstations = this.state.predAllStation;
        var X_data = [];
        if(predallstations && predallstations.length){
            predallstations.map((predscore) => { 
                X_data.push({x:predscore.hour, y: predscore.score});
                return true;
            })
        }
        const graph = this.state.predAllStation !== undefined ? <LineChart
                                                                    axes
                                                                    datePattern="%H"
                                                                    xType={'time'}
                                                                    axisLabels={{x: 'Time', y: 'Predicted Available Bikes'}}
                                                                    grid
                                                                    verticalGrid
                                                                    dataPoints
                                                                    height={250}
                                                                    width={1200}
                                                                    yDomainRange={[0, 40]}
                                                                    data={[X_data]}/> : null;
                                                                    
        
        return (
            <div>
            <h5>Select Bike Station To View Predictions from Next Week:</h5>
                <form className="myClass" onSubmit={this.handleSubmit}>
                    <Select
                      name="bikes"
                      options={this.state.bikeinfo}
                      value={this.getSelectValue('test')}
                      onChange={this.onSelectChange} />
                    <br/>
                    <input type="submit" className="myButton" value="Predict"/>
                </form>
                {graph}
            </div>
        );
    }
}
 
export default NewStationInstallation;