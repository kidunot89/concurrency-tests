import React, { useContext } from 'react';
import {
  Container,
  Row,
  Col
} from "shards-react";

import AppContext from '../app/context';
import RequestManagerContext, { useRequestManagerState, initialState } from './context';
import SelectBar from './select-bar';
import Controls from './controls';
import Editor from './editor';

const RequestManager = () => {
  const { selectedRequest } = useContext(AppContext);

  return (
    <RequestManagerContext.Provider value={useRequestManagerState(initialState)}>
      <Container>
        <SelectBar />
        {false !== selectedRequest && (
          <Container>
            <Row>
              <Col><Controls /></Col>
            </Row>
            <Row>
              <Col><Editor /></Col>
            </Row>
          </Container>
        )}
      </Container>
    </RequestManagerContext.Provider>
  );
};

export default RequestManager;
