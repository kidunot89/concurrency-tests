import React, { useContext } from 'react';
import get from 'lodash/get';
import { Button, Row } from 'shards-react';

import AppContext from '../app/context';
import RequestManagerContext from '../request-manager/context';
import AxiosHelper from '../../utils/axios';
import getMutation from './mutations';
import testResponse from '../../utils/test-response';

const processSessionAndTestResponse = (response, request, index = 0, print = (m) => {}) => {
  const sessionToken = get(response, 'header.woocommerce-session');
  if (sessionToken) {
    AxiosHelper.addHeader('woocommerce-session', `Session ${sessionToken}`);
  }
  
  // Hijack Console Log.
  const oldLog = console.log.bind(console);
  console.log = function() {
    print(JSON.stringify([...arguments]));
  };

  testResponse(response, request, index);

  // Cleanup
  console.log = oldLog;
}

const RunQueryButton = () => {
  const { endpoint, requests, eachRequest, getRequestFieldValue, updateRequestField, selectRequestIndex, clearAllRequestFields } = useContext(AppContext);
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
        .nextRequest(endpoint, getMutation(type), variables)
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
