import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fetchCassandraData } from '../Services/CassandraService';
import {BarChart} from 'react-easy-chart';
import {AverageService} from '../Services/AverageService';

export default class VizDataExtract extends Component {
    constructor(props){
        super(props);
        this.state = 
            {
            allData : [],
            averageData : [],
            avg : 'test',
            station : undefined,
            fromDate: undefined,
            toDate: undefined
            };
    }
    
    getParsedDate(date){
        date = String(date).split('.');
        return date[0];
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.stations && prevProps.fromDate && prevProps.toDate){
            if (this.state.station !== prevProps.stations || this.state.fromDate !== prevProps.fromDate || this.state.toDate !== prevProps.toDate) {
                this.state.station = prevProps.stations;
                this.state.fromDate = prevProps.fromDate;
                this.state.toDate = prevProps.toDate
                this.onRouteChanged(this.state.station, this.state.fromDate, this.state.toDate);
            }
        }
    }
    
    onRouteChanged(stationNumber, fromDate, toDate) {
        fetchCassandraData(stationNumber, fromDate, toDate).then((json) => {
            this.setState({allData: json})
        });
        AverageService(stationNumber, fromDate, toDate).then((json) => {
            this.setState({averageData: json})
        });
    }

    render() {
        var alldata = this.state.allData;
        var average = this.state.averageData;
        var X_data = [];
        var Y_data = [];
        var avg= undefined;
        const graph = this.state.station !== undefined ? <BarChart
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
                    /> : null;
        if(average.dbikesdata && average.dbikesdata[0]){
             avg = average.dbikesdata[0].avg_available_bikes;
           }
        
        if(alldata.dbikesdata){
            alldata.dbikesdata.map((dbikesdata) => { 
                X_data.push({x: this.getParsedDate(dbikesdata.last_update), y: dbikesdata.available_bikes});
                Y_data.push({x: this.getParsedDate(dbikesdata.last_update), y: avg});
            })
        }
        return (
            <div>
                <div className="App">
                    {graph}
                </div>				
            </div>
        );
    }
}