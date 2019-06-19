import apiAgent from './api/apiAgent.js';
import nodeGenerator from './lib/nodeGenerator.js';
import domHelper from './lib/domHelper.js';
import Cart from './lib/cart';
import Good from './lib/good';

const App = (function () {
  let offeredGoodsList = [];
  let cart = Cart.create();

  function init() {

    apiAgent.getAllGoods().then((data) => {
      offeredGoodsList = data;
      data.map((item) => {
        const {
          id,
          price,
          imgUrl,
          amount,
          title,
          description,
          category
        } = item;
        let goodsItemNode = nodeGenerator.generateGoodsItemNode(id, price, imgUrl, amount, title, description, category);
        domHelper.insert(goodsItemNode, '.goods-block');
      });
    });

    domHelper.click('goods-section__menu', 'menu__menu-item', ({
      target,
      parent
    }) => {
      const goodsBlock = document.querySelector('.goods-block');
      const children = [].slice.call(goodsBlock.children);
      const filterValue = target.dataset.filterValue;
      domHelper.filter(filterValue, children);
    });

    domHelper.click('goods-block', 'goods-item__description-button', ({
      target,
      parent
    }) => {
      const item = target.closest('.goods-block__goods-item');
      const itemId = item.dataset.id;
      const offeredGoodData = offeredGoodsList.find((elem) => {
        return elem.id == itemId;
      });
      const {
        id,
        category,
        price,
        imgUrl,
        amount,
        title,
        description,
      } = offeredGoodData;
      let orderedNumber = parseInt(item.querySelector('.goods-item__description-input').value, 10);

      if (!isNaN(orderedNumber) && orderedNumber !== 0) {
        orderedNumber > amount ? orderedNumber = amount : orderedNumber = orderedNumber;
        const good = new Good(id, price, imgUrl, amount, orderedNumber, title, description, category);
        cart.addItem(good);
      }
    });

    document.querySelector('.delete-all-btn').addEventListener('click', (e) => {
      cart.deleteAllItems();
    })
    cart.addCallback(displayCartGoodsNumberOnCartBtn);
    cart.addCallback(renderCartList);
    cart.addCallback(blockCartBtns);
    cart.addCallback(setTotalSum);
    cart.runCallbacks();
  }

  // start of: helpers
  function setTotalSum() {
    const totalSum = cart.calculateTotalSum();
    document.querySelector('#totalSum').textContent = totalSum.toFixed(2);
  }

  function displayCartGoodsNumberOnCartBtn() {
    let numberOfOrderedGoods = cart.getNumberOfOrderedGoods();
    const cartBtnTxt = document.querySelector('#cartBtn').querySelector('.cart-block__btn-text');
    numberOfOrderedGoods !== 0 ? cartBtnTxt.textContent = numberOfOrderedGoods : cartBtnTxt.textContent = 'empty';
  }

  function blockCartBtns() {
    const btns = Array.from(document.querySelector('.control-block').querySelectorAll('.control-block__btn'));
    btns.forEach((btn) => {
      cart.getAllItems().length === 0 ? btn.disabled = true : btn.disabled = false;
    })
  }

  function renderCartList() {
    document.querySelector('#cartList').innerHTML = '';
    const cartGoods = cart.getAllItems();
    cartGoods.map((item) => {
      const cartGoodsItemNode = nodeGenerator.generateCartGoodsItemNode(item);
      domHelper.insert(cartGoodsItemNode, '.cart-block__list');
      cartGoodsItemNode.querySelector('.small-goods-item__delete-btn').addEventListener('click', () => {
        cart.deleteItemById(item.id);
      });
    });
  }
  // end of: helpers
  
  return {
    init,
  }
})()

export default App;