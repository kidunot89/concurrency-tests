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

const ApplyCoupon = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);
  const [code, updateCode] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('applyCoupon', {
      input: {
        clientMutationId: v4(),
        code,
      },
    });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <label htmlFor="product-id">Coupon code</label>
        <FormInput
          id="coupon-code"
          value={code}
          onChange={(e) => updateCode(e.target.value)}
          required
        />
      </FormGroup>
      <ButtonGroup>
        <Button theme="secondary" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Add Mutation</Button>
      </ButtonGroup>
    </Form>
  );
};

export default ApplyCoupon;
