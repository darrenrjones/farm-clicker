module.exports = function (feed1, feed2, cCardCount) {
  if(isNaN(feed2)){
    return feed1 >= cCardCount
  } 
  return feed1 >= cCardCount && feed2 >= cCardCount
};
