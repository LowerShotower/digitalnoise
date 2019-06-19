 const nodeGenerator = (function () {
   /**
    * Temporary node of unit of product
    * @param {string} category item category
    * @param {number} price item price
    * @param {string} imgUrl url to image
    * @param {string} title particular item title
    * @param {string} description details
    * @returns {Node} html node
    */
   function generateGoodsItemNode(id = 9999, price = 1.99, imgUrl = '/assets/img/goods-m-2.jpg',amount=1, title =
     'WOMENS BURNT ORANGE CASUAL TEE ', description = 'Classic casual t-short for women on the move. 100% cotton', category = 'men') {
     const htmlNode = document.createElement('div');
     htmlNode.dataset.id = id;
     htmlNode.className = `goods-block__goods-item goods-item ${category}`;
     htmlNode.innerHTML = `
 <div class="goods-item__inner-wrapper">
   <div class="goods-item__shadow-box"></div>
   <img src="${imgUrl}" alt="good item" class="goods-item__image">
   <div class="goods-item__price"><span><span class="pound">&pound;</span>${price}</span></div>
   <div class="goods-item__amount"><span>${amount}</span> left</div>
   <div class="goods-item__description">
     <h4 class="goods-item__description-title">${title}<span class="goods-item__description-price"><span
           class="pound">&pound;</span>${price}</span></h4>
     <p class="goods-item__description-text">${description}</p>
     <div class="goods-item__add-item-block">
       <input type="text" class="goods-item__description-input input" placeholder="1" value="1" onchange=console.log('helllo')>
       <button class="goods-item__description-button btn"><span><i
             class="goods-item__description-button-cart-icon cart-icon">&#xe800;</i> add to
           cart</span></button>
     </div>
   </div>
 </div>
 `
     return htmlNode;
   }

   function generateCartGoodsItemNode({id = 9999, price = 1.99, imgUrl = '/assets/img/goods-m-2.jpg',amount =1, orderedNumber = 1, title = 'MENS BURNT ORANGE CASUAL TEE ', description = 'Classic casual t-short for men on the move.100 % cotton', category = 'men'}) {
     const htmlNode = document.createElement('li');
     htmlNode.dataset.id = id;
     htmlNode.className = `cart-block__list-item dropdown-submenu__link-item list__list-item`;
     htmlNode.innerHTML = `
    <div class="small-goods-item">
      <img src=${imgUrl} alt="goods-w-" class="small-goods-item__img">
      <div class="small-goods-item__description">
        <h4 class="small-goods-item__description-title">${title}</h4>
        <p class="small-goods-item__description-text">${description}</p>
        <p class="small-goods-item__description-price">Price: <span class="pound">&pound;</span><span>${price} </span>x<span> ${orderedNumber}</p>
      </div>
      <div class="small-goods-item__delete-btn btn">
        <div class="small-goods-item__delete-cross"></div>
      </div>
    </div>
    `
     return htmlNode;
   }

   return {
     generateGoodsItemNode,
     generateCartGoodsItemNode,
   }
 })()

 export default nodeGenerator;