import React, { useContext } from 'react';
import { Button } from 'shards-react';
import { each } from 'lodash';

import AppContext from '../app/app-context';
import AxiosHelper from '../../utils/axios';
import testQuery from '../../utils/test-manager';

const RunQueryButton = () => {
  const { endpoint, requests } = useContext(AppContext);
  const runQueries = () => {
    console.log(requests);
    requests.forEach((request) => {
      AxiosHelper
        .nextRequest(endpoint, request.query, request.variables)
        .then((results) => testQuery(results, request));
    });
  };

  return (<Button pill size="lg" onClick={runQueries}>Run Queries</Button>);
};

export default RunQueryButton;
