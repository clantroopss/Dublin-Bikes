import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fetchCassandraData } from '../Services/CassandraService';
import * as d3 from 'd3'
import {BarChart} from 'react-easy-chart';
import {AverageService} from '../Services/AverageService';

export default class VizDataExtract extends Component {
    constructor(props){
        super(props);
        this.state = 
            {
            allData : [],
            points_array : [],
            averageData : [],
            avg : 'test'
            };
    }
    
    getParsedDate(date){
        date = String(date).split('.');
        return date[0];
    }

    componentDidMount = () => {
        fetchCassandraData().then((json) => {
            this.setState({allData: json})
        });
        AverageService().then((json) => {
            this.setState({averageData: json})
        });
    }
    
    componentDidUpdate = () =>
    {
        this.pre
    }

    render() {
        var alldata = this.state.allData;
        var average = this.state.averageData;
        var X_data = [];
        var Y_data = [];

        if(average.dbikesdata){
            average.dbikesdata.map((dbikesdata) => { 
                this.setState({avg:dbikesdata.avg_available_bikes})
            })}
        
        if(alldata.dbikesdata){
            alldata.dbikesdata.map((dbikesdata) => { 
                X_data.push({x: this.getParsedDate(dbikesdata.last_update), y: dbikesdata.available_bikes});
                Y_data.push({x: this.getParsedDate(dbikesdata.last_update), y: this.state.avg});
            })
        }
        return (
            <div>
                <div className="App">
                    <BarChart
                        axisLabels={{x: 'Time', y: 'Available Bikes'}}
                        axes
                        datePattern="%Y-%m-%d %H:%M:%S"
                        height={250}
                        width={1200}
                        xType={'time'}
                        lineData={Y_data}
                        y2Type="linear"
                        data={X_data}
                        margin={{top: 20, right: 0, bottom: 30, left: 100}}
                        yTickNumber={5}
                        barWidth={2}
                        yDomainRange={[0, 50]}
                    />
                </div>				
            </div>
        );
    }
}