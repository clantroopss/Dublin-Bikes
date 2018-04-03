import React, { Component } from "react";
import { fetchPredictionsDay } from '../Services/PredictionService';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService';
import {LineChart} from 'react-easy-chart';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
require('react-select/dist/react-select.min.css');


 
class NewStationInstallation extends Component {
constructor(props){
        super(props);
        const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
        this.state = 
            {
               predAllStation : undefined,
               showToolTip: false,
               windowWidth: initialWidth - 100
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
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.setState({windowWidth: window.innerWidth - 100});
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
        var result = undefined;
        if(this.state.windowWidth < 600){
            result = this.state.predAllStation !== undefined ? <Row><Col xs={12} md={12}><LineChart
                                                                    axes
                                                                    axisLabels={{x: 'Time', y: 'Predicted Available Bikes'}}
                                                                    grid
                                                                    verticalGrid
                                                                    dataPoints
                                                                    width={this.state.windowWidth}
                                                                    height={this.state.windowWidth}
                                                                    yDomainRange={[0, 40]}
                                                                    data={[X_data]}/></Col></Row> : null;
            
        } else {
            result = this.state.predAllStation !== undefined ? <Row><Col xs={12} md={12}><LineChart
                                                                    axes
                                                                    axisLabels={{x: 'Time', y: 'Predicted Available Bikes'}}
                                                                    grid
                                                                    verticalGrid
                                                                    dataPoints
                                                                    height={250}
                                                                    width={1200}
                                                                    yDomainRange={[0, 40]}
                                                                    data={[X_data]}/></Col></Row> : null;
        }
        
                                                                    
        const graph = result;
        var padding ={
            padding: "7px"
        };
        return (
            <Grid>
                <Row><Col xs={12} md={12}>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                                <Col style={padding} xs={12} md={4} ><b>Select Bike Station to view todays prediction</b></Col>
                                <Col style={padding} xs={12} md={5}>
                                    <Select
                                      name="bikes"
                                      options={this.state.bikeinfo}
                                      value={this.getSelectValue('test')}
                                      onChange={this.onSelectChange} />
                                </Col>
                                <Col style={padding} xs={12} md={3}><input type="submit" className="myButton" value="Predict"/></Col>
                        </Row>
                        {graph}
                    </form></Col>
                </Row>
            </Grid>
        );
    }
}
 
export default NewStationInstallation;