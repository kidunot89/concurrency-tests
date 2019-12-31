import React, { useContext } from 'react';
import { Button } from 'shards-react';

import AppContext from '../app/context';
import AxiosHelper from '../../utils/axios';
import getMutation from './mutations';
import testQuery from '../../utils/test-manager';

const RunQueryButton = () => {
  const { endpoint, requests } = useContext(AppContext);
  const runQueries = () => {
    console.log(requests);
    requests.forEach(({ actions, batch }, index) => {
      if (batch) {
        AxiosHelper
        .nextBatchRequest(
          endpoint,
          actions.map(({ type, variables }) => ({ query: getMutation(type), variables })),
        )
        .then((results) => console.log(results));
      } else {
        if (!actions.length) {
          return;
        }
        const { type, variables } = actions[0];
        AxiosHelper
        .nextRequest(endpoint, getMutation(type), variables)
        .then((results) => console.log(results));
      }
    });
  };

  return (<Button pill size="lg" onClick={runQueries}>Run Queries</Button>);
};

export default RunQueryButton;
