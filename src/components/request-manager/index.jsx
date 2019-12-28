import React, { useState, useContext } from 'react';
import { map } from 'lodash';
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
} from "shards-react";

import AppContext from '../app/app-context';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const RequestManager = () => {
  const {
    requests,
    updateRequests,
    selectedRequest,
    selectRequestIndex,
    addRequest,
    removeRequest,
    getRequestFieldValue,
    getRequestFieldHandler,
  } = useContext(AppContext);
  
  const [modalOpen, toggleModal] = useState(false);
  const [requestName, updateRequestName] = useState('');
  const [tab, selectTab] = useState('query');

  const onAdd = () => {
    addRequest(requestName);

    // Cleanup
    updateRequestName('');
    toggleModal(false);
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>Editing Request: </InputGroupText>
        </InputGroupAddon>
        <FormSelect name="current-request" value={selectedRequest} onChange={(e) => selectRequestIndex(e.target.value)}>
          {map(requests,({ name }, index) => <option key={index} value={index}>{name}</option>)}
          {!requests.length && <option>No Requests</option>}
        </FormSelect>
        <InputGroupAddon type="append">
          <Button type="button" onClick={() => toggleModal(true)}>
            New Request
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {false !== selectedRequest && (
        <Container>
          <Row>
            <Nav pills>
              <NavItem active={'query' === tab}>
                <NavLink href="#" onClick={() => selectTab('query')} active={'query' === tab}>
                  Query
                </NavLink>
              </NavItem>
              <NavItem active={'tests' === tab}>
                <NavLink href="#" onClick={() => selectTab('tests')} active={'tests' === tab}>
                  Tests
                </NavLink>
              </NavItem>
            </Nav>
          </Row>
          <Row>
            <Col>
              {tab === 'tests' ? (
                <>
                  <p className="float-right mb-2 h4">Tests</p>
                  <FormTextarea className="mb-3" onChange={getRequestFieldHandler('tests')} />
                </>
              ) : (
                <>
                  <p className="float-right mb-2 h4">Query</p>
                  <FormTextarea className="mb-3" onChange={getRequestFieldHandler('query')} />
                  <p className="float-right mb-2 h4">Variables</p>
                  <FormTextarea className="mb-3" onChange={getRequestFieldHandler('variables')} />
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}

      <Modal open={modalOpen} toggle={() => toggleModal(!modalOpen)}>
        <ModalHeader>Add New Request</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="request-name">Name</label>
              <FormInput id="request-name" value={requestName} onChange={(e) => updateRequestName(e.target.value)}></FormInput>
            </FormGroup>
            <Button onClick={onAdd}>Add new request</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default RequestManager;
