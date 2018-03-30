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
        this.state = { selectedOption: 'option1', selectValue: undefined };
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
        this.props.stationFilter(event)
    }

    getInitialState = () => {
        return {
          selectValue: ''
        }
    }
    
    onSelectChange = (value) => {
        this.setState({ selectValue:value });
    }

    getSelectValue(val) {
        return (this.state.selectValue == '') ? val : this.state.selectValue;
    }

    render() {
        var dropdownstyle = {
                  width: '30%',
            };
        const content1 = this.state.selectedOption === 'option1'
            ? <div style ={dropdownstyle}><br />
              <Select
                  name="bikes"
                  options={this.state.bikeinfo}
                  value={this.getSelectValue('test')}
                  onChange={this.onSelectChange} />
                <br/>
              </div>
          : null;
        
        const vizdataextract = this.state.selectValue !== undefined ?
              <VizDataExtract stations = {this.state.selectValue.value} /> : null;

        return(
          <div>
            <h3>Select Bike Station:</h3>
            <form onSubmit={this.handleSubmit}>
              { content1 }
            <input type="submit" className="myButton"/>
            {vizdataextract}
          </form>
          </div>
        )
    }
}

export default DropdownBikeStation