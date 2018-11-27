module.exports = function (feed, cCard, inventory) {
  const consumptionRates = {
    chicken: 1,
    pig: 2,
    sheep: 2,
    cow: 3,
    goat: 2,
    fish: 5,
  }
  const type = cCard.type.slice(0, -1);
  const rate = consumptionRates[type];
  if (feed.length) {
    for (let i = 0; i < feed.length; i++) {
      // console.log(`loop: ${cCard.type} `);
      // console.log(`inventory: ${feed[i]} ${inventory[feed[i]]} `);
      // console.log(`count * rate: ${cCard.count * rate} `);


      // console.log(`${cCard.type}'s ${feed[i]}:::::::${inventory[feed][i]} < ${cCard.count * rate}:::: ${inventory[feed][i] < cCard.count * rate}`);
      // console.log(`${cCard.type}'s ${feed[i]} --- ${inventory[feed[i]]} < ${cCard.count * rate} >>> ${inventory[feed[i]] < cCard.count * rate}`);
      
      if (inventory[feed[i]] < cCard.count * rate) {
        // console.log(`${cCard.type}`);
        
        //if inventory doesnt have feedtype > count*rate than not enough food
        return false;
      }
    }
  }

  return true;
};
