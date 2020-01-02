import React, { useContext } from 'react';
import get from 'lodash/get';
import { Button, Row } from 'shards-react';

import AppContext from '../app/context';
import RequestManagerContext from '../request-manager/context';
import AxiosHelper from '../../utils/axios-helper';
import getMutation from './mutations';
import testResponse from '../../utils/test-response';

const processSessionAndTestResponse = (response, request, index = 0, print = (m) => {}) => {
  const sessionToken = get(response, 'header.woocommerce-session');
  if (sessionToken) {
    AxiosHelper.addHeader('woocommerce-session', `Session ${sessionToken}`);
  }
  
  // Hijack Console Log.
  const oldLog = console.log.bind(console);
  console.log = function(...messages) {
    print(JSON.stringify(messages));
  };

  testResponse(response, request, index);

  // Cleanup
  console.log = oldLog;
}

const RunQueryButton = () => {
  const {
    endpoint,
    requests,
    eachRequest,
    getRequestFieldValue,
    updateRequestField,
    selectRequestIndex,
    clearAllRequestFields,
    sessionId,
  } = useContext(AppContext);
  const { selectTab } = useContext(RequestManagerContext);
  const runQueries = () => {
    clearAllRequestFields('tests');
    console.log(requests);
    selectTab('tests');
    eachRequest((request, index) => {
      selectRequestIndex(index);
      const print = (message) => {
        const previous = getRequestFieldValue('tests') || '';
        updateRequestField(
          'tests',
          `${previous}
          ${message}`
        );
      }
      const { actions, batch } = request
      if (batch) {
        AxiosHelper
        .nextBatchRequest(
          sessionId,
          endpoint,
          actions.map(({ type, variables }) => ({ query: getMutation(type), variables })),
        )
        .then((response) => processSessionAndTestResponse(response, request, index, print));
      } else {
        if (!actions.length) {
          return;
        }
        const { type, variables } = actions[0];
        AxiosHelper
        .nextRequest(sessionId, endpoint, getMutation(type), variables)
        .then((response) => processSessionAndTestResponse(response, request, 0, print));
      }
    });
  };

  return (
    <Row>
      <Button block size="lg" onClick={runQueries}>Run Queries</Button>
    </Row>
  );
};

export default RunQueryButton;
