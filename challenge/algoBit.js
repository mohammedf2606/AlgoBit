const fs = require('fs');
const csv = require('csvtojson')

let balance = 100;
let bitcoin = 0;

/*
                      ------ AlgoBit Challenge ------

  In this challenge we want to simulate a sell and buy strategy for bitcoin. Let's imaging we have 100£ in this simulation.
  We should be able to set a threshold for loss and profit, so that
  1) if the loss goes above the threshold we should sell and reflect the losses in our balance.
  2) be able to make the most prfit on on each purchase.

  Examine if this method can make any profit and try to find an optimal threshold for profit and loss so that we can maximise the profit
  or minimise the damage.

  You can do whatever you want, add modules or create new files.

*/


// Basic sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function generateTime(data){
  // typeof data = array
  const times = [];
  for(let i = 0; i < data.length; i++){
    times.push(data[i].Time);
  }
  return times; // some data
}

function generateBitstamp(data){
  // typeof data = array
  const bitstampData = [];
  for(let i = 0; i < data.length; i++){
    bitstampData.push(data[i].bitstamp);
  }
  return bitstampData; // some data
}

// This module can read file with a path from the root of the project.
async function readFile(){
  return new Promise((resolve,reject)=>{
    fs.readFile('../dataset/smallDataSet.csv','utf8',(err, data)=>{
        if(err) reject(err);
        resolve(data);
    });
  })
}



// Complete this function, so we can return array of object from our csv file
// use async/await
async function parseCSV(data){
  try {
    return csv().fromString(data).then((csvToObj)=>{
      const allTimes = generateTime(csvToObj);
      const allPrices = generateBitstamp(csvToObj);
      return {allTimes, allPrices};
    });
  } catch (error) {
    console.log(error);
  }
}


async function invest(currentPrice){
  try{
    let invest = balance * 0.75;
    balance *= 0.25;
    var bought = invest / currentPrice;
    bitcoin += bought;
    // console.log('Buying ', bought, 'bitcoins');
    // await sleep(100);
    // console.log('You now have ', bitcoin, 'bitcoins');
    // await sleep(100);
  } catch (error) {
    console.error(error);
  }
}


// Uncomment logs for smaller test cases
async function AlgoBit(){
  const data = await readFile()
  const parsed = await parseCSV(data);
  console.log('\nStart time: ', parsed.allTimes[0]);
  try {
    for(let i = 0; i < parsed.allPrices.length; i++){
      const currentPrice = parseFloat(parsed.allPrices[i]);
      // console.log('\nCurrent Time: ', parsed.allTimes[i])
      // console.log('Current price of Bitcoin is: $', currentPrice.toFixed(2));
      // console.log('You currently have $', parseFloat(balance).toFixed(2));
      // await sleep(100);
      if(i != 0){
        const basePrice = parsed.allPrices[i-1];
        if (currentPrice - 0.1 < basePrice) {
          // console.log('Selling', bitcoin, 'bitcoins');
          // await sleep(100);
          balance += bitcoin * currentPrice;
          bitcoin = 0;
        }
        if (currentPrice + 1.7 > basePrice){
          await invest(currentPrice);
        }
        else {
          void(0);
        }
      }
      else {
        await invest(currentPrice);
      }
    }
    balance += bitcoin * parsed.allPrices[parsed.allPrices.length - 1];
    console.log('\nEnd time: ', parsed.allTimes[parsed.allTimes.length - 1]);
    console.log('\nYou ended with $', parseFloat(balance).toFixed(2));
    console.log('That is a profit of $', parseFloat(balance - 100).toFixed(2));
  } catch(error){
    console.error(error);
  }
}


AlgoBit();
