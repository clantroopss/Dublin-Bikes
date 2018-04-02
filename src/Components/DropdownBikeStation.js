import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService';
import VizDataExtract from './VizDataExtract';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
require('react-select/dist/react-select.min.css');

class DropdownBikeStation extends Component {
    constructor() {
        super();
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        todayTime = month + "/" + day + "/" + year;
        var max = '';
        if(month <10){
                max = year + "-0" + month; 
            } else {
                max = year +"-"+ month;
            }
            if(day <10){
                max += "-0"+day; 
            } else {
                max += "-"+day;
            }
        this.state = { selectedOption: 'option1', selectValue: undefined, fromDate: undefined, toDate: undefined, min: '2018-03-15', max:max ,today: todayTime};
        this.handleOptionChange = this.handleOptionChange.bind(this);
        
    }

    handleOptionChange(changeEvent) {
      this.setState({
        selectedOption: changeEvent.target.value
      })
    }
    
    componentDidMount = () => {
        bikeInfo()
          .then((json) => {
            this.setState({ bikeinfo: json} )
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ fromDate:event.target.from.value , toDate: event.target.to.value})
    }

    getInitialState = () => {
        return {
          selectValue: ''
        }
    }
    
    onSelectChange = (value) => {
        this.setState({ selectValue:value });
    }
    onFromChange = (event) => {
        this.setState({ fromDate:event.target.value });
    }
    onToChange = (event) => {
        this.setState({ toDate:event.target.value });
    } 
    getSelectValue(val) {
        return (this.state.selectValue === '') ? val : this.state.selectValue;
    }
    getFromValue(val) {
        if(val === ''){
            val =this.state.today
        }
        return (this.state.fromDate === undefined) ? val : this.state.fromDate;
    }
    getToValue(val) {
        if(val === ''){
            val =this.state.today
        }
        return (this.state.toDate === undefined) ? val : this.state.toDate;
    }

    render() {
        var inputstyle = {
              width : "75%",
              height: "34px"
        };
        const content1 = this.state.selectedOption === 'option1'
            ?   <Row>
                    <Col xs={12} md={3}>
                        <Row>
                            <Col xs={12} md={3}><b>Stations</b></Col>
                            <Col xs={12} md={9}>
                                <Select
                                  name="bikes"
                                  options={this.state.bikeinfo}
                                  value={this.getSelectValue('test')}
                                  onChange={this.onSelectChange} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} md={3}>
                        <Row>
                            <Col xs={12} md={3}><b>From</b></Col>
                            <Col xs={12} md={9}>
                                <input type="date" name="from" value={this.getFromValue('')} onChange={this.onFromChange} min={this.state.min} max={this.state.max} style ={inputstyle} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} md={3}>
                        <Row>
                            <Col xs={12} md={3}><b>To</b></Col>
                            <Col xs={12} md={9}>
                                <input type="date" name="to" value={this.getToValue('')} onChange={this.onToChange} min={this.state.min} max={this.state.max} style ={inputstyle}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} md={3}>
                        <input type="submit" className="myButton" value="Bike Usage"/>
                    </Col>
                </Row> : null;
        
        const vizdataextract = this.state.selectValue !== undefined ?
              <Row><Col xs={12} md={12}><VizDataExtract stations = {this.state.selectValue.value} fromDate = {this.state.fromDate} toDate = {this.state.toDate} /></Col></Row> : null;

        return(
            <Grid>
            <form onSubmit={this.handleSubmit}>
              { content1 }
            </form>
            {vizdataextract}
          </Grid>
        )
    }
}

export default DropdownBikeStation