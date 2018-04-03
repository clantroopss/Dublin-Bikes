import React, { Component } from 'react';
import Select from 'react-select';
import { bikeInfo } from '../Services/BikeService';
import { busInfo } from '../Services/BikeService';
import { luasInfo } from '../Services/BikeService';
import BootstrapTable from 'react-bootstrap-table-next';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
require('react-select/dist/react-select.min.css');

require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');


class MapForm extends Component {
 constructor() {
  	super();
    this.state = { checked: false, selectedOption: 'option1',show: false , mailContent: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange() {
  	this.setState({
    	checked: !this.state.checked
    })
  }
  handleClose() {
    this.setState({ show: false });
      // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    
    var content = "Please transfer bike to station " + window.attentionRequired.name + " Current available number of bikes at station is :" + window.attentionRequired.available_bikes + " & According to prediction for Next 1 hour available bikes would be : " +window.attentionRequired.prediction;
    this.setState({mailContent : content});
    const msg = {
      to: 'merb@tcd.ie; royn@tcd.ie;mehtar@tcd.ie; kesavana@tcd.ie; hazarika@tcd.ie',
      from: 'clantroops@gmail.com',
      subject: 'Attention!! Transfer',
      text: content,
      html: '<strong>'+content+'</strong>',
    };
    var headers =  {
    'Content-Type': 'application/json' , 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':'X-Requested-With'   
};
    sgMail.client.defaultHeaders = headers;
    sgMail.client.defaultRequest.baseUrl = "https://cors-anywhere.herokuapp.com/"+ sgMail.client.defaultRequest.baseUrl
    sgMail.send(msg);
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
              width: '90%',
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
        }, {
           dataField: 'prediction',
          text: 'Next 1 hour Prediction' 
        }];
      const bikecolumns = [{
          dataField: 'stationName',
          text: 'Station Name'
        }, {
          dataField: 'distance',
          text: 'Distance in meters'
        }];
      var biketable = null;
      var TransferRequest = null;
      if(this.state.overallData && this.state.overallData.bike){
          var bikestats = [];
          bikestats.push({stationName: 'Bus:   ' + this.state.overallData.busData[0].businfo.fullname, distance: this.state.overallData.busData[0].distance});
          bikestats.push({stationName: 'Luas:   ' +this.state.overallData.luasData[0].luasinfo.name, distance: this.state.overallData.luasData[0].distance});
          const BikeCaptionElement = () => <div style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>{this.state.overallData.stations[0].name} </div>;
            
            if(this.state.overallData.stations[0].prediction < 5){
                window.attentionRequired = this.state.overallData.stations[0];
                this.state.mailContent = "Please transfer bike to station " + window.attentionRequired.name + "Current available number of bikes at station is :" + window.attentionRequired.available_bikes + " & According to prediction for Next 1 hour available bikes would be : " +window.attentionRequired.prediction;
                TransferRequest =  <input type="submit" className="myButton" value="Transfer" onClick={() => this.setState({ show: true })}/>
            }
            
          biketable = <div><BootstrapTable keyField='id' data={ bikestats } columns={ bikecolumns } caption={<BikeCaptionElement />} />
            <p> Available Bikes: {this.state.overallData.stations[0].available_bikes} </p>
            <p> Next 1 hour prediction: {this.state.overallData.stations[0].prediction}</p></div>
             
        /*var bikenearbusstop = geolib.orderByDistance(this.state.overallData.busData[0].businfo, this.state.overallData.stations);
        bikenearbusstop.map((obj) => {
          obj.stationName = this.state.overallData.stations[obj.key].name;
          obj.available_bike_stands = this.state.overallData.stations[obj.key].available_bike_stands;
        })
        
        const BusCaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Bus stop : {this.state.overallData.busData[0].businfo.fullname}</h3>;

        bustable = <div className="tableStyle"><BootstrapTable keyField='id' data={ bikenearbusstop } columns={ columns } caption={<BusCaptionElement />} /></div>*/

      }
      const content10 = TransferRequest;
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
          obj.prediction = this.state.overallData.stations[obj.key].prediction;
          return true;
        })
        
        const BusCaptionElement = () => <div style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Bus stop : {this.state.overallData.busData[0].businfo.fullname}</div>;

        bustable = <BootstrapTable keyField='id' data={ bikenearbusstop } columns={ columns } caption={<BusCaptionElement />} />

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
          obj.prediction = this.state.overallData.stations[obj.key].prediction;
          return true;
        })
        const LuasCaptionElement = () => <div style={{ borderRadius: '0.25em', textAlign: 'center', color: 'black', border: '1px solid black', padding: '0.5em' }}>Nearest bike stations to Luas stop: {this.state.overallData.luasData[0].luasinfo.name} </div>;

        luastable = <BootstrapTable keyField='id' data={ bikebasedondistance } columns={ columns } caption={<LuasCaptionElement />} />

      }
      
      const content4 = luastable;
      const content5 = bustable;
      const content6 = biketable;
    return(
      <Grid>
        <form onSubmit={this.handleSubmit}>
        <h4> Nearest Public Services from</h4>
            <Row>
                <Col xs={12} md={4}>
                    <Row>
                        <Col xs={12} md={4}>
                            <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
                            Bike Station
                        </Col>
                        <Col xs={12} md={4}>
                            <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
                            Bus Stop
                        </Col>
                        <Col xs={12} md={4}>
                                    <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} onChange={this.handleOptionChange} />
                                    Luas Stop
                        </Col>
                    </Row>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs={12} md={4}>{ content1 } { content2 } { content3 }</Col>
            </Row>
            <br />
            <Row>
                <Col xs={12} md={4}><input type="submit" className="myButton" value="Search"/></Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    {content4}
                    {content5}
                    {content6}
                    {content10}
                    <Modal
                      show={this.state.show}
                      onHide={this.handleHide}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                         Transfer Request
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {this.state.mailContent}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.handleClose}>Send</Button>
                      </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </form>
      </Grid>
    )
  }
}

export default MapForm