import { assert } from 'chai';
import _ from 'lodash';

const testResponse = (response, request, index) => {
  const { batch, name: requestName } = request;
  const requestType = batch ? 'Batch Request' : 'Request';
  const description = `${requestType}: ${requestName}`;
  console.log(description);

  request.actions.forEach(({ type, variables }, actionIndex) => {
    let data;
    if (Array.isArray(response.data)) {
      data = response.data[actionIndex].data;
    } else {
      data = response.data.data;
    }

    try {
      switch (type) {
        case 'addToCart':
          const { productId, quantity, variationId } = variables.input;
          console.log(`addToCart product ${productId} x ${quantity}`);

          // Confirm data.
          data = data.addToCart;
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
          const { items } = variables.input;
          const itemNames = items.reduce((previousName, nextItem, index) => {
            const lastIndex = items.length - 1;
            return `${previousName} Cart item: ${nextItem.key} x ${nextItem.quantity} ${index < lastIndex ? ',' : ''}`;
          }, '');
          console.log(`updateItemQuantities ${itemNames}`);

          // Confirm data.
          data = data.updateItemQuantities;
          assert.isOk(data, 'Invalid updateItemQuantities object');

          // Test "items" output.
          assert.isOk(data.items, 'Invalid "items" object');
          items
            .filter(item => item.quantity !== 0)
            .forEach((item) => {
              const updatedCartItem = _.find(data.items, ({ key, quantity }) => item.key === key && `${item.quantity}` === `${quantity}`);
              assert.isOk(updatedCartItem, `Cart item identified by key: ${item.key} not updated.`);
            });

          // Test "removed" output.
          assert.isOk(data.removed, 'Invalid "removed" object');
          items
            .filter(item => item.quantity === 0)
            .forEach((item) => {
              // Don't check quantity because is hold previous quantity before removal.
              const removedCartItem = _.find(data.removed, ({ key }) => item.key === key);
              assert.isOk(removedCartItem, `Cart item identified by key: ${item.key} not removed.`);
            });

          // Test "updated" output.
          assert.isOk(data.updated, 'Invalid "updated" object');
          items
            .filter(item => item.quantity !== 0)
            .forEach((item) => {
              const updatedCartItem = _.find(data.updated, ({ key, quantity }) => item.key === key && `${item.quantity}` === `${quantity}`);
              assert.isOk(updatedCartItem, `Failed to update the quantity of cart item identified by key: ${item.key}.`);
            });

          // Test "cart" output.
          assert.isOk(data.cart, 'Invalid "cart" object');
          items
            .filter(item => `${item.quantity}` !== '0')
            .forEach((item) => {
              const cartItemInCart = _.find(data.cart.contents.nodes, ({ key, quantity }) => {
                if (item.key !== key) {
                  return false;
                }
                if (item.quantity !== `${quantity}`) {
                  return false;
                }

                return true;
              });
              assert.isOk(cartItemInCart, `Cart item identified by ${item.key} not found in "cart"`);
            });
          console.log('✔');
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
      console.log(`${error.message} ✘`);
    }
  });
};

export default testResponse;
