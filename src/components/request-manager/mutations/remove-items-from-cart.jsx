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

const RemoveItemsFromCart = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);
  const [keys, updateKeys] = useState([]);

  const addKey = () => {
    updateKeys([...keys, '']);
  };

  const getKeyHandler = (selectedIndex) => {
    return (e) => {
      let newKey = e.target.value;
      updateKeys(keys.map((key, index) => (index === selectedIndex) ? newKey : key));
    }
  }

  const removeKey = (selectedIndex) => {
    updateKeys(keys.filter((_, index) => index !== selectedIndex));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('removeItemsFromCart', {
      input: {
        clientMutationId: v4(),
        keys,
      },
    });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      {keys.map((key, index) => (
        <React.Fragment key={`cart-item-key-${index}`}>
          <FormGroup>
            <label htmlFor={`cart-item-key-${index}`}>Cart Item Key</label>
            <InputGroup>
              <FormInput
                id={`cart-item-key-${index}`}
                value={key}
                onChange={getKeyHandler(index)}
                required
              />
              <InputGroupAddon type="append">
                <Button theme="danger" onClick={() => removeKey(index)}>Remove</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </React.Fragment>
      ))}
      <ButtonGroup>
        <Button onClick={addKey}>Add +</Button>
        <Button theme="secondary" onClick={closeModal}>Cancel</Button>
        <Button theme="danger" type="submit">Add Mutation</Button>
      </ButtonGroup>
    </Form>
  );
};

export default RemoveItemsFromCart;