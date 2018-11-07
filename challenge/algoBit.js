const fs = require('fs');
const csv = require('csvtojson')

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
      const bitstampData = generateBitstamp(csvToObj);
      return {allTimes, bitstampData};
    });
  } catch (error) {
    console.log(error);
  }
}


async function AlgoBit(){
  let balance = 100;
  const data = await readFile();
  // console.log({data});
  // .... Complete this function
  const parsed = await parseCSV(data);
  // console.log({parsed});
  const buy = function()

}


AlgoBit();
