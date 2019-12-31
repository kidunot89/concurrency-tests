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

const RemoveCoupons = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);
  const [codes, updateCodes] = useState([]);

  const addCode = () => {
    updateCodes([...codes, '']);
  };

  const getCodeHandler = (selectedIndex) => {
    return (e) => {
      let newCode = e.target.value;
      updateCodes(codes.map((code, index) => (index === selectedIndex) ? newCode : code));
    }
  }

  const removeCode = (selectedIndex) => {
    updateCodes(codes.filter((_, index) => index !== selectedIndex));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('removeCoupons', {
      input: {
        clientMutationId: v4(),
        codes,
      },
    });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      {codes.map((code, index) => (
        <React.Fragment key={`coupon-code-${index}`}>
          <FormGroup>
            <label htmlFor={`coupon-code-${index}`}>Coupon code</label>
            <InputGroup>
              <FormInput
                id={`coupon-code-${index}`}
                value={code}
                onChange={getCodeHandler(index)}
                required
              />
              <InputGroupAddon type="append">
                <Button theme="danger" onClick={() => removeCode(index)}>Remove</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </React.Fragment>
      ))}
      <ButtonGroup>
        <Button onClick={addCode}>Add +</Button>
        <Button theme="secondary" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Add Mutation</Button>
      </ButtonGroup>
    </Form>
  );
};

export default RemoveCoupons;
