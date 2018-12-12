module.exports = function enoughFeed(feed, cCard, inventory) {
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
      if (inventory[feed[i]] < cCard.count * rate) {
        //if inventory doesnt have feedtype > count*rate than not enough food
        return false;
      }
    }
  }

  return true;
};

