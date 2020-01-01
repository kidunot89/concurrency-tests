import { assert } from 'chai';
import _ from 'lodash';

const testResponse = (response, request, index) => {
  const { batch, name: requestName } = request;
  const requestType = batch ? 'Batch Request' : 'Request';
  const description = `${requestType}: ${requestName}`;
  console.log(description);

  request.actions.forEach(({ type, variables }, actionIndex) => {
    try {
      switch (type) {
        case 'addToCart':
          const { productId, quantity, variationId } = variables.input;
          console.log(`addToCart product ${productId} x ${quantity}`);

          // Confirm data.
          const data = response.data[actionIndex].data.addToCart;
          assert.isOk(data, 'Invalid addToCart object');

          // Test "cartItem" output.
          const cartItem = data.cartItem
          assert.isOk(cartItem, 'Invalid "cartItem" object');

          // Test "cart" output.
          const cart = data.cart
          assert.isOk(cart, 'Invalid "cart" object');
          const cartItemInCart = _.find(cart.contents.nodes, ({ product, variation, quantity: qty }) => {
            if (productId !== product.productId) {
              return false;
            }
            if (variation && variationId !== variation.variationId) {
              return false;
            }
            if (quantity !== qty) {
              return false
            }
            return true;
          });
          assert.isOk(cartItemInCart, 'Cart item not found in "cart"');
          console.log('✔');
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
    } catch(error) {
      console.log('✘');
      console.log(error.message);
    }
  });
};

export default testResponse;
