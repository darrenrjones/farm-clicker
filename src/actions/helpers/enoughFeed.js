module.exports = function (feed1, feed2, cCardCount) {
  return ((feed1 >= cCardCount && feed2 >= cCardCount) || (feed1 >= cCardCount && isNaN(feed2)))
};
