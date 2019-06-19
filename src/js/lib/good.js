/**
 * Constructor to create unit of product
 * @param {number} id item id
 * @param {string} category item category
 * @param {number} price item price
 * @param {string} imgUrl url to image
 * @param {number} amount amount of items of one time
 * @param {string} title particular item title
 * @param {string} description details
 * @param {number} orderedNumber orderedNumber
 */
function Good(id, price, imgUrl, amount, orderedNumber, title, description, category) {
  if (Good.idCounter === undefined) {
    Good.idCounter = 0;
  }
  Object.defineProperties(this, {
    id: {
      value: id || Good.idCounter,
      writable: false,
      configurable: false,
      enumerable: true,
    },
  });
  this.category = category;
  this.price = price;
  this.imgUrl = imgUrl;
  this.amount = amount;
  this.orderedNumber = orderedNumber >= 0? orderedNumber: 0;
  this.title = title;
  this.description = description || '';
  Object.preventExtensions(this);
  Good.idCounter++;
}

function wrapper(callback) {
  return function (unit, value = 1) {
    if (['amount','price','orderedNumber'].some((elem)=>{ return elem == unit})) {
      // eslint-disable-next-line no-restricted-globals
      if (this[unit] !== undefined) {
        callback.apply(this, [unit, value]);
      } else {
        console.log(`\n set value of  ${unit} first\n`);
      }
    } else {
      console.log(`\n${unit} is not countable or doesnt exist\n`);
    }
  };
}

function addFunc(unit, value) {
  this[unit] = this[unit] + value;
  if(unit = 'orderedNumber'){
    this[unit] > this.amount?this[unit] = this.amount: null;
  }
}

function reduceFunc(unit, value) {
  this[unit] = (this[unit] - value) <= 0 ? 0 : this[unit] - value;
}

Good.prototype.addUnit = wrapper(addFunc);

Good.prototype.reduceUnit = wrapper(reduceFunc);

Good.prototype.setDescription = function (description = '') {
  this.description = description;
};

module.exports = Good;
