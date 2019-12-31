import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonGroup,
} from 'shards-react';

import AppContext from '../app/context';

const SelectBar = () => {
  const {
    requests,
    selectedRequest,
    selectRequestIndex,
    addRequest,
    updateRequestName,
    removeRequest,
    currentRequest,
  } = useContext(AppContext);

  const [modalType, updateModalType] = useState('new');
  const [modalOpen, toggleModal] = useState(false);
  const [name, updateName] = useState(''); 

  const toggleEditModal = () => {
    updateModalType('edit');
    updateName(currentRequest.name)
    toggleModal(true);
  };

  const toggleRemoveModal = () => {
    updateModalType('remove');
    toggleModal(true);
  };

  const toggleNewModal = () => {
    updateModalType('new');
    toggleModal(true);
  };

  const onEdit = (e) => {
    e.preventDefault();
    updateRequestName(selectedRequest, name);

    // Cleanup
    updateName('');
    toggleModal(false);
  };

  const onRemove = (e) => {
    e.preventDefault();
    removeRequest(selectedRequest);

    // Cleanup
    toggleModal(false);
  };

  const onAdd = (e) => {
    e.preventDefault();
    addRequest(name);

    // Cleanup
    updateName('');
    toggleModal(false);
  };

  let modalHeader;
  let modalBody;
  switch (modalType) {
    case 'edit':
      modalHeader = 'Edit Request';
      modalBody = (
        <Form onSubmit={onEdit}>
          <FormGroup>
            <label htmlFor="request-name">Name</label>
            <FormInput
              id="request-name"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button theme="secondary" onClick={() => toggleModal(false)}>Cancel</Button>
            <Button type="submit">Edit request</Button>
          </ButtonGroup>
        </Form>
      );
      break;
    case 'remove':
      modalHeader = 'Remove Request';
      modalBody = (
        <Form onSubmit={onRemove}>
          <p className="lead"><strong>Are you sure?</strong></p>
          <ButtonGroup>
            <Button theme="secondary" onClick={() => toggleModal(false)}>Cancel</Button>
            <Button theme="danger" type="submit">Remove</Button>
          </ButtonGroup>
        </Form>
      );
      break;
    default:
      modalHeader = 'Add New Request';
      modalBody = (
        <Form onSubmit={onAdd}>
          <FormGroup>
            <label htmlFor="request-name">Name</label>
            <FormInput
              id="request-name"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button theme="secondary" onClick={() => toggleModal(false)}>Cancel</Button>
            <Button type="submit">Add new request</Button>
          </ButtonGroup>
        </Form>
      );
      break;
  }

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>Editing Request: </InputGroupText>
        </InputGroupAddon>
        <FormSelect name="current-request" value={selectedRequest} onChange={(e) => selectRequestIndex(e.target.value)}>
          {requests.map(({ name }, index) => <option key={index} value={index}>{name}</option>)}
          {!requests.length && <option>No Requests</option>}
        </FormSelect>
        <InputGroupAddon type="append">
          <Button disabled={false === selectedRequest} theme="secondary" onClick={toggleEditModal}>Edit</Button>
          <Button disabled={false === selectedRequest} theme="danger" onClick={toggleRemoveModal}>Remove</Button>
          <Button type="button" onClick={toggleNewModal}>
            New Request
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Modal open={modalOpen} toggle={() => toggleModal(!modalOpen)}>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
      </Modal>
    </>
  );
};

export default SelectBar;
