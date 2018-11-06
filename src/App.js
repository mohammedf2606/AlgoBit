import React, { Component } from 'react';
import {kclLogo} from './logo.js';
import './App.css';
import {Chart, Line} from 'react-chartjs-2';
import Hammer from 'hammerjs';
import zoom from 'chartjs-plugin-zoom'
import fetchBitcoinData from './bitcoinData';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 1,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

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
