import React, { useState, useEffect, useContext } from 'react';
import { get } from 'lodash';
import { FormInput } from 'shards-react';
import Autosuggest from 'react-autosuggest';

import AppContext from '../../app/context';
import axiosHelper from '../../../utils/axios-helper';

const GET_CART_ITEMS = `
  query {
    cart {
      contents {
        nodes {
          key
          product {
            id
            name
          }
          variation {
            id
            name
          }
          quantity
          subtotal
          total
        }
      }
    }
  }
`;

const CartItemInput = (props) => {
  const [cartItems, setCartItems] = useState([])
  const [suggestions, updateSuggestions] = useState([]);
  const { sessionId, endpoint } = useContext(AppContext);

  useEffect(() => {
    if(!cartItems.length && sessionId) {
      axiosHelper.nextRequest(sessionId, endpoint, GET_CART_ITEMS)
        .then((results) => {
          console.log(results);
          const items = get(results, 'data.data.cart.contents.nodes');
          if (items) {
            setCartItems(items.map(({ key, product, variation, quantity }) => {
              let name;
              if ( variation ) {
                name = `${variation.name} x ${quantity}`;
              } else {

                name = `${product.name} x ${quantity}`;
              }
              return { name, value: key };
            }));
          }
        });
    }
  }, [cartItems, sessionId]);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = ({ value, reason }) => {
    console.log(value);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? cartItems : cartItems.filter(({ name, value }) => {
      return name.toLowerCase().slice(0, inputLength) === inputValue 
        || value.toLowerCase().slice(0, inputLength) === inputValue 
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.value;

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  return (
    <Autosuggest
      className="form-control"
      suggestions={suggestions}
      onSuggestionsFetchRequested={(value) => updateSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => updateSuggestions([])}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderInputComponent={(inputProps) => <FormInput {...inputProps} />}
      inputProps={props}
    />
  )
};

export default CartItemInput;
