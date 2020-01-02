import axios from 'axios';
import v4 from 'uuid/v4';
import { times, random, isEmpty } from 'lodash';

class AxiosHelper {
  constructor() {
    this.headers = {};
  }

  async createSession(url) {
    let sessionId = null;

    const results = await axios({
      url,
      method: 'post',
      responseType: 'json',
      data: {
        query: `
          query {
            products(first: 5, where: { typeIn: [VARIABLE, SIMPLE] }) {
              nodes {
                id
                productId
                type
                ... on VariableProduct {
                  variations(first: 5) {
                    nodes {
                      id
                      variationId
                    }
                  }
                }
              }
            }
          }
        `,
      },
    });

    try {
      if (!results.data) {
        throw new Error('Failed to create session');
      }

      if (!results.data.data || !results.data.data.products) {
        throw new Error('Product query failed');
      }
      
      if (!results.data.data.products.nodes) {
        throw new Error('No purchasable products found');
      }
    } catch(error) {
      console.error(error.message);
      return false;
    }

    const { products } = results.data.data;
    for (let i = 0; i < random(5, 7); i++) {
      const nextProduct = products.nodes[random(0, products.nodes.length - 1)];
      const input = {
        clientMutationId: v4(),
        productId: nextProduct.productId,
        quantity: random(1, 6),
      };

      if ('VARIABLE' === nextProduct.type && !isEmpty(nextProduct.variations.nodes)) {
        input.variationId = nextProduct.variations.nodes[0].variationId;
      } 

      const results = await axios({
        url,
        method: 'post',
        responseType: 'json',
        headers: sessionId ? { 'woocommerce-session': `Session ${sessionId}` } : undefined,
        data: {
          query: `
            mutation ($input: AddToCartInput!) {
              addToCart(input: $input) {
                clientMutationId
                cartItem {
                  key
                  product {
                    id
                    productId
                  }
                  variation {
                    id
                    variationId
                  }
                  quantity
                  subtotal
                  subtotalTax
                  total
                  tax
                }
                cart {
                  contents {
                    nodes {
                      key
                      product {
                        id
                        productId
                      }
                      variation {
                        id
                        variationId
                      }
                      quantity
                      subtotal
                      subtotalTax
                      total
                      tax
                    }
                  }
                }
              }
            }
          `,
          variables: { input },
        },
      });

      try {
        if (!results.data.data) {
          throw new Error('addToCart mutation failed.');
        }

        if (results.data.data.errors || !results.data.data.addToCart) {
          throw new Error('Failed to add product to cart');
        }
    
        if (!results.headers['woocommerce-session']) {
          throw new Error('Failed to create session token');
        }
      } catch(error) {
        console.error(error.message);
        return false;
      }
      
      sessionId = results.headers['woocommerce-session'];
    }

    return sessionId;
  }

  addHeader(name, value) {
    this.headers[name] = value;
  }

  removeHeader(name) {
    delete this.headers[name];
  }

  nextRequest(sessionId, url, query, variables) {
    return axios({
      url,
      method: 'post',
      responseType: 'json',
      data: { query, variables },
      headers: sessionId ? { 'woocommerce-session': `Session ${sessionId}` } : undefined,
    });
  }

  nextBatchRequest(sessionId, uri, data) {
    return axios({
      url: uri,
      method: 'post',
      responseType: 'json',
      data,
      headers: sessionId ? { 'woocommerce-session': `Session ${sessionId}` } : undefined,
    });
  }


}

const axiosHelper = new AxiosHelper();

export default axiosHelper;

export const VALID_URI_QUERY = `
  query {
    posts(first: 1) {
      nodes {
        id
      }
    }
  }
`;
