import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
/*import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
require('react-select/dist/react-select.min.css');
var options = require('./data/bikeinformation.json');

var Hello = React.createClass({
  getInitialState: function() {
    return {
      selectValue: ''
    }
  },
  onSelectChange: function(value) {
    this.setState({
      selectValue:value
    });
  },
  getSelectValue: function(val) {
    return (this.state.selectValue == '') ? val : this.state.selectValue;
  },
  render: function() {
    return (
      <div>
        <Select
          name="city"
          options={options}
          value={this.getSelectValue('test')}
          onChange={this.onSelectChange} />
      </div>);
  }
});

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);*/