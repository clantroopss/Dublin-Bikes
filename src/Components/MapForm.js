import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService'
import { busInfo } from '../Services/BikeService'
import { luasInfo } from '../Services/BikeService'
require('react-select/dist/react-select.min.css');

class MapForm extends Component {
 constructor() {
  	super();
    
    this.state = { checked: false, selectedOption: 'option1' };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  handleChange() {
  	this.setState({
    	checked: !this.state.checked
    })
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
    busInfo()
      .then((json) => {
        this.setState({ businfo: json} )
    })
    luasInfo()
      .then((json) => {
        this.setState({ luasinfo: json} )
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onFilter(event)
  }
  getInitialState = () => {
    return {
      selectValue: ''
    }
  }
  onSelectChange = (value) => {
    this.setState({ selectValue:value });
  }
  onSelectBusChange = (value) => {
    this.setState({selectBusValue:value });
  }
  onSelectLuasChange = (value) => {
    this.setState({selectluasValue:value });
  }
  getSelectValue(val) {
    return (this.state.selectValue === '') ? val : this.state.selectValue;
  }
  getSelectBusValue(val) {
    return (this.state.selectBusValue === '') ? val : this.state.selectBusValue;
  }
    getSelectluasValue(val) {
    return (this.state.selectluasValue === '') ? val : this.state.selectluasValue;
  }


  render() {
    const content1 = this.state.selectedOption === 'option1'
    	? <div><br /><label className="filter-column">Bike Station Information</label>
          <Select
              name="bikes"
              options={this.state.bikeinfo}
              value={this.getSelectValue('test')}
              onChange={this.onSelectChange} />
            <br/>
          </div>
      : null;
      const content2 = this.state.selectedOption === 'option2'
    	? <div><br /><label className="filter-column">Bus Stops</label>
          <Select
              name="bus"
              options={this.state.businfo}
              value={this.getSelectBusValue('test')}
              onChange={this.onSelectBusChange} />
            <br/>
          </div>
      : null;
      const content3 = this.state.selectedOption === 'option3'
    	? <div><br /><label className="filter-column">Luas Stops</label>
            <Select
              name="luas"
              options={this.state.luasinfo}
              value={this.getSelectluasValue('test')}
              onChange={this.onSelectLuasChange} />
        </div>
      : null;
    return(
      <div>
        <h3>Select Bike Station:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="radio">
          <label>
            <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
            Select Bike station to understand bike station situation
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
            Search Nearest bike station from Bus stops:
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} onChange={this.handleOptionChange} />
            Search Nearest bike station from luas stops:
          </label>
        </div>
          { content1 }
          { content2 }
          { content3 }
        <br/>
        <input type="submit" className="myButton"/>
      </form>
      </div>
    )
  }
}

export default MapForm