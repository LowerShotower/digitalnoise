import data from './data.js';
 
export default {
  /**
   * get api data with all existed objects
 * @returns {[{id,category,price,imgUrl,amount,title,desctiption}]}  response array of objects
  */
  getAllGoods: async function () {
    let result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(data));
      }, 300);
    });
    return result;
  }
}