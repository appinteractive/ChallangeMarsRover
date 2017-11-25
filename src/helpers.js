
/**
 * helper function that works kind of like async.eachSeries
 * @param arr
 * @param iteratorFn
 * @returns {*}
 */
module.exports = {
  eachSeries(arr, iteratorFn) {
    return arr.reduce(function(p, item) {
      return p.then(function() {
        return iteratorFn(item);
      });
    }, Promise.resolve());
  }
}