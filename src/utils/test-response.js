import { expect } from 'chai';
import { find } from 'lodash';

const testResponse = (response, request, index) => {
  request.actions.forEach(({ type, variables }) => {
  
    switch (type) {
      case 'addToCart':
        break;
      case 'updateItemQuantities':
        break;
      case 'removeItemsFromCart':
        break;
      case 'restoreCartItems':
        break;
      case 'emptyCart':
        break;
      case 'applyCoupon':
        break;
      case 'removeCoupons':
        break;
      default:
        break;
    }
  });
  
    console.log({ response, request, index });
    

};

export default testResponse;
