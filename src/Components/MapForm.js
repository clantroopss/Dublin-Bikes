import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService';
import { busInfo } from '../Services/BikeService';
import { luasInfo } from '../Services/BikeService';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
require('react-select/dist/react-select.min.css');

require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');


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
        selectedOption: changeEvent.target.value,
        selectValue: '',
        selectBusValue: '',
        selectluasValue: '',
        overallData: ''
      })
     this.props.parentMethod();
    }
componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //this.props.onRouteChanged();
      this.setState({
        overallData: this.props.overallData
      })
    }
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
    	?  <Select
              name="bikes"
              options={this.state.bikeinfo}
              value={this.getSelectValue('test')}
              onChange={this.onSelectChange} />
      : null;
      const content2 = this.state.selectedOption === 'option2'
    	? <Select
              name="bus"
              options={this.state.businfo}
              value={this.getSelectBusValue('test')}
              onChange={this.onSelectBusChange} />
      : null;
      const content3 = this.state.selectedOption === 'option3'
    	? <Select
              name="luas"
              options={this.state.luasinfo}
              value={this.getSelectluasValue('test')}
              onChange={this.onSelectLuasChange} />
      : null;
      var dropdownstyle = {
              width: '30%',
              display: "inline-table",
              padding: '1%'
        };
      var geolib = require('geolib');
      const columns = [{
          dataField: 'stationName',
          text: 'Station Name'
        }, {
          dataField: 'distance',
          text: 'Distance in meters'
        }, {
           dataField: 'available_bike_stands',
          text: 'Available Bikes' 
        }];
      const bikecolumns = [{
          dataField: 'stationName',
          text: 'Station Name'
        }, {
          dataField: 'distance',
          text: 'Distance in meters'
        }];
      var biketable = null;
      if(this.state.overallData && this.state.overallData.bike){
          var bikestats = [];
          bikestats.push({stationName: 'Bus:   ' + this.state.overallData.busData[0].businfo.fullname, distance: this.state.overallData.busData[0].distance});
          bikestats.push({stationName: 'Luas:   ' +this.state.overallData.luasData[0].luasinfo.name, distance: this.state.overallData.luasData[0].distance});
          const BikeCaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>{this.state.overallData.stations[0].name} </h3>;
          biketable = <div className="tableStyle"><BootstrapTable keyField='id' data={ bikestats } columns={ bikecolumns } caption={<BikeCaptionElement />} /></div>
        /*var bikenearbusstop = geolib.orderByDistance(this.state.overallData.busData[0].businfo, this.state.overallData.stations);
        bikenearbusstop.map((obj) => {
          obj.stationName = this.state.overallData.stations[obj.key].name;
          obj.available_bike_stands = this.state.overallData.stations[obj.key].available_bike_stands;
        })
        
        const BusCaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Bus stop : {this.state.overallData.busData[0].businfo.fullname}</h3>;

        bustable = <div className="tableStyle"><BootstrapTable keyField='id' data={ bikenearbusstop } columns={ columns } caption={<BusCaptionElement />} /></div>*/

      }
      var bustable = null;
      if(this.state.overallData && this.state.overallData.busData && this.state.overallData.busData[0] && this.state.overallData.bus){
          this.state.overallData.stations.map((obj) => {
              obj.latitude =  obj.position.lat; 
              obj.longitude = obj.position.lng;
              return true;
          })
        
        var bikenearbusstop = geolib.orderByDistance(this.state.overallData.busData[0].businfo, this.state.overallData.stations);
        bikenearbusstop.map((obj) => {
          obj.stationName = this.state.overallData.stations[obj.key].name;
          obj.available_bike_stands = this.state.overallData.stations[obj.key].available_bikes;
          return true;
        })
        
        const BusCaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Bus stop : {this.state.overallData.busData[0].businfo.fullname}</h3>;

        bustable = <div className="tableStyle"><BootstrapTable keyField='id' data={ bikenearbusstop } columns={ columns } caption={<BusCaptionElement />} /></div>

      }
      var luastable = null;
      if(this.state.overallData && this.state.overallData.luasData && this.state.overallData.luasData[0] && this.state.overallData.luas){
          this.state.overallData.stations.map((obj) => {
              obj.latitude =  obj.position.lat; 
              obj.longitude = obj.position.lng;
              return true;
          })
        var bikebasedondistance = geolib.orderByDistance(this.state.overallData.luasData[0].luasinfo, this.state.overallData.stations);
        bikebasedondistance.map((obj) => {
          obj.stationName = this.state.overallData.stations[obj.key].name;
          obj.available_bike_stands = this.state.overallData.stations[obj.key].available_bikes;
          return true;
        })
        const LuasCaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Luas stop: {this.state.overallData.luasData[0].luasinfo.name} </h3>;

        luastable = <div className="tableStyle"><BootstrapTable keyField='id' data={ bikebasedondistance } columns={ columns } caption={<LuasCaptionElement />} /></div>

      }
      
      const content4 = luastable;
      const content5 = bustable;
      const content6 = biketable;
    return(
      <div>
        <h3> Search nearest Bus & Luas stops</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="radio">
          <label>
            <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
            Bike station
          </label>
          <div style ={dropdownstyle}>
                { content1 }
          </div>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
            Bus stops
          </label>
          <div style ={dropdownstyle}>
            { content2 }
          </div>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} onChange={this.handleOptionChange} />
            luas stops
          </label>
            <div style ={dropdownstyle}>
          { content3 }
            </div>
        </div>
        <br/>
        <input type="submit" className="myButton" value="Search"/>
        {content4}
        {content5}
        {content6}
      </form>
      </div>
    )
  }
}

export default MapForm