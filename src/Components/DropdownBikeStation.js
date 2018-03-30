import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService'
import { busInfo } from '../Services/BikeService'
import { luasInfo } from '../Services/BikeService'
require('react-select/dist/react-select.min.css');

class DropdownBikeStation extends Component {
 constructor() {
  	super();
    this.state = { selectedOption: 'option1' };
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
//      this.props.stationFilter = event
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
    
    return(
      <div>
        <h3>Select Bike Station:</h3>
        <form onSubmit={this.handleSubmit}>
          { content1 }
        <input type="submit" className="myButton"/>
      </form>
      </div>
    )
  }
}

export default DropdownBikeStation