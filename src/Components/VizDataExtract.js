import React, { Component } from 'react';
import { fetchCassandraData } from '../Services/CassandraService';
import {ToolTip, BarChart} from 'react-easy-chart';
import {AverageService} from '../Services/AverageService';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


export default class VizDataExtract extends Component {
    constructor(props){
        super(props);
        const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
        this.state = 
            {
            allData : [],
            averageData : [],
            avg : 'test',
            station : undefined,
            fromDate: undefined,
            toDate: undefined,
            showToolTip: false,
            windowWidth: initialWidth - 100
            };
    }
    
    getParsedDate(date){
        date = String(date).split('.');
        return date[0];
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentDidUpdate(prevProps) {
        if(prevProps.stations && prevProps.fromDate && prevProps.toDate){
            if (this.state.station !== prevProps.stations || this.state.fromDate !== prevProps.fromDate || this.state.toDate !== prevProps.toDate) {
                //this.setState({station: prevProps.stations, fromDate: prevProps.fromDate, toDate: prevProps.toDate})
                this.state.station = prevProps.stations;
                this.state.fromDate = prevProps.fromDate;
                this.state.toDate = prevProps.toDate;
                this.onRouteChanged(this.state.station, this.state.fromDate, this.state.toDate);
            }
        }
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.setState({windowWidth: window.innerWidth - 100});
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
        var result = undefined;
        if(this.state.windowWidth < 600){
            result = this.state.station !== undefined ? <BarChart
                        axisLabels={{x: 'Time', y: 'Available Bikes'}}
                        axes
                        legend
                        datePattern= "%Y-%m-%d %H:%M:%S"
                        tickTimeDisplayFormat={'%I'}
                        width={this.state.windowWidth + 65}
                        height={this.state.windowWidth - 100}
                        xType={'time'}
                        lineData={Y_data}
                        y2Type="linear"
                        data={X_data}
                        yTickNumber={5}
                        barWidth={2}
                        yDomainRange={[0, 40]}
                    /> : null;
        } else {
            result = this.state.station !== undefined ? <BarChart
                        axisLabels={{x: 'Time', y: 'Available Bikes'}}
                        axes
                        legend
                        datePattern= "%Y-%m-%d %H:%M:%S"
                        tickTimeDisplayFormat={'%d %b %I %p'}
                        width={1200}
                        height={450}
                        xType={'time'}
                        lineData={Y_data}
                        y2Type="linear"
                        data={X_data}
                        yTickNumber={5}
                        barWidth={2}
                        yDomainRange={[0, 40]}
                    /> : null;
        }
        const graph = result;
        if(average.dbikesdata && average.dbikesdata[0]){
             avg = average.dbikesdata[0].avg_available_bikes;
           }
        
        if(alldata.dbikesdata){
            alldata.dbikesdata.map((dbikesdata) => { 
                X_data.push({x: this.getParsedDate(dbikesdata.last_update), y: dbikesdata.available_bikes});
                Y_data.push({x: this.getParsedDate(dbikesdata.last_update), y: avg});
                return true;
            })
        }
        var marginleft ={
            "margin-left": "-15%"
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12} style={marginleft}>
                    {graph}
                    </Col>
                </Row>
            </Grid>
        );
    }
}