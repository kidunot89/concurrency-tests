import React, { useState, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormInput,
  Button,
  ButtonGroup,
} from 'shards-react';
import v4 from 'uuid/v4';

import AppContext from '../../app/context';

const AddToCart = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);
  const [productId, updateProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [variationId, setVariationId] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('addToCart', {
      input: {
        clientMutationId: v4(),
        productId,
        quantity: quantity ? quantity : 1,
        variationId: variationId ? variationId : undefined,
      },
    });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="product-id">Product ID</label>
        <FormInput
          type="number"
          id="product-id"
          value={productId}
          onChange={(e) => updateProductId(Number.parseInt(e.target.value))}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="quantity">Quantity</label>
        <FormInput
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="variation-id">Variation ID</label>
        <FormInput
          type="number"
          id="variation-id"
          value={variationId}
          onChange={(e) => setVariationId(Number.parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonGroup>
        <Button theme="secondary" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Add Mutation</Button>
      </ButtonGroup>
    </Form>
  );
};

export default AddToCart;
