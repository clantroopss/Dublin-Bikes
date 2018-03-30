import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService'
import { busInfo } from '../Services/BikeService'
import { luasInfo } from '../Services/BikeService'
import VizDataExtract from './VizDataExtract'
require('react-select/dist/react-select.min.css');

class DropdownBikeStation extends Component {
    constructor() {
        super();
        this.state = { selectedOption: 'option1', selectValue: undefined, fromDate: undefined, toDate: undefined, min: '2018-03-15', max:''};
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
        return (this.state.selectValue == '') ? val : this.state.selectValue;
    }
    getFromValue(val) {
        if(val === ''){
            var todayTime = new Date();
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
            val = month + "/" + day + "/" + year;
        }
        return (this.state.fromDate === undefined) ? val : this.state.fromDate;
    }
    getToValue(val) {
        if(val === ''){
            var todayTime = new Date();
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
            val = month + "/" + day + "/" + year;
            if(month <10){
                this.state.max = year + "-0" + month +"-"+day; 
            } else {
                this.state.max = year +"-"+ month +"-"+day;
            }
        }
        return (this.state.toDate === undefined) ? val : this.state.toDate;
    }

    render() {
        var dropdownstyle = {
                  width: '30%',
            };
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1
            if(todayTime.getMonth < 10){
                month = "0" + month;
            }

            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
        const today = year + "-" + month + "-"+ day;
        const content1 = this.state.selectedOption === 'option1'
            ? <div style ={dropdownstyle}><br />
              <Select
                  name="bikes"
                  options={this.state.bikeinfo}
                  value={this.getSelectValue('test')}
                  onChange={this.onSelectChange} />
                <br/>
                <label className="filter-column">Date Range:</label><br/>
                <input type="date" name="from" value={this.getFromValue('')} onChange={this.onFromChange} min={this.state.min} max={this.state.max} /><br/>
                <input type="date" name="to" value={this.getToValue('')} onChange={this.onToChange} min={this.state.min} max={this.state.max}/><br/>
              </div>
          : null;
        
        const vizdataextract = this.state.selectValue !== undefined ?
              <VizDataExtract stations = {this.state.selectValue.value} fromDate = {this.state.fromDate} toDate = {this.state.toDate} /> : null;

        return(
          <div>
            <h3>Select Bike Station:</h3>
            <form onSubmit={this.handleSubmit}>
              { content1 }
            <input type="submit" className="myButton" value="Bike Usage"/>
            {vizdataextract}
          </form>
          </div>
        )
    }
}

export default DropdownBikeStation