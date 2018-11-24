import React, { Component } from 'react';
import logo from './logo.svg';
import generateField from './utils/generateField.js'
import Field from './Components/Field/Field'
import './App.css';
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: false,
      endpoint: "http://192.168.0.9:4001",
      field: generateField(8,8)
    }
    this.selectLocation = this.selectLocation.bind(this)
    this.socket = ''
  }

  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = io(endpoint);
    this.socket.on("FromAPI", data => {
      this.setState({response: data, field: data })
      console.log(data)
      console.log(this.state.field)
    });
  }

  selectLocation(location) {
    this.socket.emit("FromClient",location);
  }


  render() {
    return (
      <div className="App">
        <Field field={this.state.field} handleClick={this.selectLocation}/>
      </div>
    );
  }
}

export default App