import React, { useContext } from 'react';
import {
  Form,
  ButtonGroup,
  Button,
} from 'shards-react';
import v4 from 'uuid/v4';

import AppContext from '../../app/context';

const RestoreCartItems = ({ closeModal }) => {
  const { addNewAction } = useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();
    addNewAction('emptyCart', { input: { clientMutationId: v4() } });
    closeModal();
  };

  return (
    <Form onSubmit={onSubmit}>
      <p className="lead"><strong>Are you sure?</strong></p>
      <ButtonGroup>
        <Button theme="secondary" onClick={closeModal}>No</Button>
        <Button theme="danger" type="submit">Yes</Button>
      </ButtonGroup>
    </Form>
  );
};

export default RestoreCartItems;