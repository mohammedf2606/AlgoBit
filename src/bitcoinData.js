const axios = require('axios');
const csv=require('csvtojson')
const { smallData } = require('./constants');

const generateChartData = (labels, data)=>{
  return {
    labels,
    datasets: [
      {
        label: 'Bitstamp',
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
        pointHitRadius: 10,
        data,
      }
    ]
  }
}


function generateTime(data){
  // typeof data = array
  const times = [];
  for(let i = 0; i < data.length; i++){
    times.push(data[i].Time);
  }
  return times;// some data
}

function generateBitstamp(data){
  // typeof data = array
  const bitstampData = [];
  for(let i = 0; i < data.length; i++){
    bitstampData.push(data[i].bitstamp);
  }
  return bitstampData;// some data
}



// const fetchBitcoinData = function(){
//   return new Promise(function(resolve, reject){
//     axios.get(smallData).then(function(axiosFirstData){
//       console.log({axiosFirstData});
//       csv().fromString(axiosFirstData.data).then((csvToObj)=>{
//
//         const justTime = generateTime(csvToObj);
//         const bitstampData = generateBitstamp(csvToObj);
//         console.log({justTime});
//         console.log({bitstampData});
//       })
//     })
//   })
// }


const fetchBitcoinData = ()=> (new Promise((resolve, reject)=>{
      axios.get(smallData)
      .then((data)=>{
        return csv().fromString(data.data)
      })
      .then((jsonObj)=>{
          const allTimes = jsonObj.map((item)=> item.Time.toString());
          const allPrices = jsonObj.map((item)=> item.bitstamp);
          resolve(generateChartData(allTimes, allPrices))
      }).catch((err)=>{
        console.log('err',err);
      })
  }))


export default fetchBitcoinData;
