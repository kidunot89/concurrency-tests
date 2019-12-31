export const ADD_TO_CART = `
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      clientMutationId
      cartItem {
        key
        product {
          id
        }
        variation {
          id
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
            }
            variation {
              id
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
`;

export const UPDATE_ITEM_QUANTITIES = `
  mutation updateItemQuantities( $input: UpdateItemQuantitiesInput! ) {
    updateItemQuantities( input: $input ) {
      clientMutationId
      updated {
          key
          quantity
      }
      removed {
          key
          quantity
      }
      items {
          key
          quantity
      }
      cart {
        contents {
          nodes {
            key
            product {
              id
            }
            variation {
              id
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
`;

export const REMOVE_ITEMS_FROM_CART = `
  mutation ( $input: RemoveItemsFromCartInput! ) {
    removeItemsFromCart( input: $input ) {
      clientMutationId
      cartItems {
        key
        product {
          id
        }
        variation {
          id
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
            }
            variation {
              id
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
`;

export const RESTORE_CART_ITEMS = `
  mutation restoreCartItems( $input: RestoreCartItemsInput! ) {
    restoreCartItems( input: $input ) {
      clientMutationId
      cartItems {
        key
        product {
          id
        }
        variation {
          id
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
            }
            variation {
              id
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
`;

export const EMPTY_CART = `
  mutation emptyCart( $input: EmptyCartInput! ) {
    emptyCart( input: $input ) {
      clientMutationId
      cart {
        contents {
          nodes {
            key
            product {
              id
            }
            variation {
              id
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
`;

export const APPLY_COUPON = `
  mutation applyCoupon( $input: ApplyCouponInput! ) {
    applyCoupon( input: $input ) {
      clientMutationId
      cart {
        appliedCoupons {
          nodes {
            code
          }
        }
        contents {
          nodes {
            key
            product {
              id
            }
            variation {
              id
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
`;

export const REMOVE_COUPONS = `
  mutation removeCoupons( $input: RemoveCouponsInput! ) {
    removeCoupons( input: $input ) {
      clientMutationId
      cart {
        appliedCoupons {
          nodes {
            code
          }
        }
        contents {
          nodes {
              key
              product {
                ... on SimpleProduct {
                  id
                }
                ... on VariableProduct {
                  id
                }
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
`;

export default function getMutation(type) {
  switch(type) {
    case 'updateItemQuantities':
      return UPDATE_ITEM_QUANTITIES;
    case 'removeItemsFromCart':
      return REMOVE_ITEMS_FROM_CART;
    case 'restoreCartItems':
      return RESTORE_CART_ITEMS;
    case 'emptyCart':
      return EMPTY_CART;
    case 'applyCoupon':
      return APPLY_COUPON;
    case 'removeCoupons':
      return REMOVE_COUPONS;
    case 'addToCart':
    default:
      return ADD_TO_CART;
  }
}