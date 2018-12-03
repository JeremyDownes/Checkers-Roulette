import React, { Component } from 'react';
import generateField from './utils/generateField.js'
import Field from './Components/Field/Field'
import './App.css';
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
    let endpoint = window.location.hostname
    endpoint= 'http://'+endpoint+':4001'
    endpoint ='https://checkers-api-uvgydhjysi.now.sh'
    this.state = {
      response: false,
      endpoint: endpoint,
      field: generateField(8,8),
      message: undefined
    }
    this.singleSpace = this.singleSpace.bind(this)
    this.jump = this.jump.bind(this)
    this.clear = this.clear.bind(this)
    this.kingMe = this.kingMe.bind(this)
    this.socket = ''
    this.key=undefined
    this.deg = 0
  }


  componentDidMount() {
    const endpoint  = this.state.endpoint;
    this.socket = io(endpoint);
    this.socket.on("FromAPI", data => {
      if(!this.key){this.socket.emit("registerClient")}
      this.setState({response: data, field: data })
    })
    this.socket.on('Message', data => {
      this.setState({message: data})
      if(data === 'Player Connected') {
        setTimeout(()=>{this.setState({message: undefined})},2000)
      }
    })
    this.socket.on('clientRegistration', data => {
      this.key = data
    }) 
  }

  singleSpace(from,to) {
    this.socket.emit("singleSpace",{key: this.key, from: from, to: to});
  }

  jump(from,to,...args) {
    this.socket.emit("jump",{key: this.key, from: from, to: to, remove: args});    
  }

  kingMe(location) {
    this.socket.emit("KingMe",{key: this.key, location: location});
  }

  clear() {
    this.socket.emit("Clear",{key: this.key});
  }

  message() {
    return this.state.message? <div className='message'><p>{this.state.message}</p></div> : null
  }


  render() {
    return (
      <div className="App">
              <button style={{position: 'absolute'}} onClick={this.clear}>Reset</button>
              {this.message()}
        <Field field={this.state.field} singleSpace={this.singleSpace} jump={this.jump} kingMe={this.kingMe}/>
      </div>
    );
  }
}

export default App