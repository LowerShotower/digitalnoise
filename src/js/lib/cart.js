/* eslint-disable consistent-return */
/**
 * store in memory constructor
 */
function CartInMemory() {
  this.items = [];
  this.callbacks = [];
}

CartInMemory.prototype.runCallbacks = function (callbacks) {
  this.callbacks.forEach((callback) => {
    callback()
  });
}

CartInMemory.prototype.addCallback = function (callback) {
  this.callbacks.push(callback);
}

CartInMemory.prototype.addItem = function (item) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].id === item.id) {
      // console.log(`\nAn item with id ${item.id} has already exist`);
      this.items[i].addUnit('orderedNumber', item.orderedNumber);

      this.runCallbacks();
      return;
    }
  }
  this.items.push(item);
  this.runCallbacks();
};

CartInMemory.prototype.getItem = function (id) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].id === id) {
      return this.items[i];
    }
  }
  console.log(`\nAn item with such id (${id}) was not found\n`);
};

CartInMemory.prototype.getAllItems = function () {
  return this.items;
};

CartInMemory.prototype.deleteItemById = function (id) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].id === id) {
      this.items.splice(i, 1);
      this.runCallbacks();

    }
  }
};

CartInMemory.prototype.deleteAllItems = function () {
  this.items = [];
  this.runCallbacks();
};

CartInMemory.prototype.calculateTotalSum = function () {
  if (this.items.length !== 0) {
    return this.items.reduce((accum, item, index) => {
      const sumPerItemType = item.orderedNumber * item.price;
      return accum + sumPerItemType;
    }, 0);
  } else {
    return 0;
  }
};

function deepClone(src) {
  let clone;
  if (src === null || src === undefined) {
    clone = Array.isArray(src) ? [] : {};
  } else {
    clone = Array.isArray(src) ? [] : Object.create(Object.getPrototypeOf(src));
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const i in src) {
    // eslint-disable-next-line no-prototype-builtins
    if (src.hasOwnProperty(i)) {
      if (typeof src[i] === 'object') {
        clone[i] = deepClone(src[i]);
      } else {
        clone[i] = src[i];
      }
    }
  }
  return clone;
}

CartInMemory.prototype.updateItem = function (item) {
  let isMatched = false;
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].id === item.id && this.items[i] !== undefined) {
      this.items[i] = deepClone(item);
      isMatched = true;
    }
  }
  if (isMatched) {
    console.log(`\n There is no object with id ${item.id}\n`);
  }
};
CartInMemory.prototype.getNumberOfOrderedGoods = function () {
  let numberOfGoods = 0;
  this.getAllItems().forEach((item) => {
    numberOfGoods += item.orderedNumber;
  })
  return numberOfGoods;
}

CartInMemory.create = function () {
  // CartInMemory.storeCounter;
  if (CartInMemory.storeCounter === undefined) {
    CartInMemory.storeCounter = 0;
  }
  if (CartInMemory.storeCounter < 1) {
    CartInMemory.storeCounter++;
    return new CartInMemory();
  }
  console.log('\n!!! A store has already been created');
};


module.exports = CartInMemory;