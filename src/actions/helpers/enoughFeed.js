// module.exports = function (card, inventory) {
//   console.log(card);  
//   console.log(inventory); 

//   const consumptionRates = {
//     // how many crops of each feed type consumed per count
//     chicken : 1,
//     pig: 2,
//     sheep: 2,
//     cow: 3,
//     goat: 2,
//     fish: 5   
//   }
//   const type = card.type.slice(0,-1);


//   console.log(consumptionRates[type]);
//   console.log(inventory[type]);



// };


module.exports = function (feed, cCard, inventory) {
  const consumptionRates = {
    chicken: 1,
    pig: 2,
    sheep: 2,
    cow: 3,
    goat: 2,
    fish: 5
  }
  const type = cCard.type.slice(0,-1);
  const rate = consumptionRates[type];
  let timesCalled = 0

  for (const food of feed) {
    timesCalled++
    if(inventory[food] <= cCard.count * rate){
      return false;
    }
  }
  console.log('TIMESCALLED:',timesCalled);
  
  return true;
};
