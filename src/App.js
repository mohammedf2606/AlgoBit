import React, { Component } from 'react';
import {kclLogo} from './logo.js';
import './App.css';
import {Chart, Line} from 'react-chartjs-2';
import Hammer from 'hammerjs';
import zoom from 'chartjs-plugin-zoom'
import fetchBitcoinData from './bitcoinData';


var options={
  pan:{
      enabled:true,
      mode:'x'
  },
  zoom:{
      enabled:true,
      mode:'x'
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: [],
    }
  }

  componentDidMount(){
    fetchBitcoinData().then((chartData)=>{
      console.log({chartData});
      this.setState({ chartData });
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={kclLogo} className="App-logo" alt="logo" />
        </header>
        <div className="Chart">
        <Line data={this.state.chartData} options={options}/>
        </div>
      </div>
    );
  }
}

export default App;
