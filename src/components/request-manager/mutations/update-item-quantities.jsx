import React, { useState, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormInput,
  InputGroup,
  InputGroupAddon,
  Button,
  ButtonGroup,
} from 'shards-react';
import v4 from 'uuid/v4';

import AppContext from '../../app/context';
import CartItemInput from './cart-item-input';

const UpdateItemQuantities = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);
  const [items, updateItems] = useState([]);

  const addItem = () => {
    updateItems([...items, { key: '', quantity: 0 }]);
  };

  const getItemFieldHandler = (selectedIndex, field) => {
    return (e, { newValue } = {}) => {
      const oldItem = items[selectedIndex];
      console.log(e);
      let newItem = Object.assign(oldItem, { [field]: newValue || e.target.value });
      updateItems(items.map((item, index) => (index === selectedIndex) ? newItem : item));
    }
  }

  const removeItem = (selectedIndex) => {
    updateItems(items.filter((_, index) => index !== selectedIndex));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('updateItemQuantities', {
      input: {
        clientMutationId: v4(),
        items,
      },
    });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      {items.map((item, index) => (
        <React.Fragment key={`cart-item-${index}`}>
          <FormGroup>
            <label htmlFor={`cart-item-${index}-key`}>Cart Item Key</label>
            <InputGroup>
              <CartItemInput
                id={`cart-item-${index}-key`}
                value={item.key}
                onChange={getItemFieldHandler(index, 'key')}
                required
              />
              <InputGroupAddon type="append">
                <Button theme="danger" onClick={() => removeItem(index)}>Remove</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <label htmlFor={`cart-item-${index}-quantity`}>New Quantity</label>
            <FormInput
                type="number"
                id={`cart-item-${index}-quantity`}
                value={item.quantity}
                onChange={getItemFieldHandler(index, 'quantity')}
                required
              />
          </FormGroup>
        </React.Fragment>
      ))}
      <ButtonGroup>
        <Button onClick={addItem}>Add +</Button>
        <Button theme="secondary" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Add Mutation</Button>
      </ButtonGroup>
    </Form>
  );
};

export default UpdateItemQuantities;
