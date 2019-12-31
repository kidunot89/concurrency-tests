import React, { useContext } from 'react';
import get from 'lodash/get';
import { Button } from 'shards-react';

import AppContext from '../app/context';
import AxiosHelper from '../../utils/axios';
import getMutation from './mutations';
import testResponse from '../../utils/test-response';

const processSessionAndTestResponse = (response, request, index = 0) => {
  const sessionToken = get(response, 'header.woocommerce-session');
  if (sessionToken) {
    AxiosHelper.addHeader('woocommerce-session', `Session ${sessionToken}`);
  }

  testResponse(response, request, index);
}

const RunQueryButton = () => {
  const { endpoint, requests } = useContext(AppContext);
  const runQueries = () => {
    console.log(requests);
    requests.forEach((request, index) => {
      const { actions, batch } = request
      if (batch) {
        AxiosHelper
        .nextBatchRequest(
          endpoint,
          actions.map(({ type, variables }) => ({ query: getMutation(type), variables })),
        )
        .then((response) => processSessionAndTestResponse(response, request, index));
      } else {
        if (!actions.length) {
          return;
        }
        const { type, variables } = actions[0];
        AxiosHelper
        .nextRequest(endpoint, getMutation(type), variables)
        .then((response) => processSessionAndTestResponse(response, request));
      }
    });
  };

  return (<Button pill size="lg" onClick={runQueries}>Run Queries</Button>);
};

export default RunQueryButton;
