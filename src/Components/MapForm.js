import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService'
require('react-select/dist/react-select.min.css');

class MapForm extends Component {
 state = {
    bikeinfo: []
  }
  componentDidMount = () => {
    bikeInfo()
      .then((json) => {
        this.setState({ bikeinfo: json} )
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
    this.setState({
      selectValue:value
    });
  }
  getSelectValue(val) {
    return (this.state.selectValue == '') ? val : this.state.selectValue;
  }

  render() {
    return(
      <div>
        <h3>Select Bike Station:</h3>
        <form onSubmit={this.handleSubmit}>
          <label className="filter-column">Bike Station</label>
          <br/>
          <div>
          <Select
              name="bikes"
              options={this.state.bikeinfo}
              value={this.getSelectValue('test')}
              onChange={this.onSelectChange} />
          </div>
        <br/>
        <input type="submit" className="myButton"/>
      </form>
      </div>
    )
  }
}

export default MapForm