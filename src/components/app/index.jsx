import React from 'react';
import { Container } from 'shards-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import AppContext, { initialState, useAppState } from './context';
import GraphQLEndpoint from '../graphql-endpoint';
import RequestManager from '../request-manager';
import RunQueryButton from '../run-query-button';
import './app.css';

const App = () => (
  <AppContext.Provider value={useAppState(initialState)}>
    <Container className="app-wrapper">
      <h1>WooGraphQL Cart Mutation Tester</h1>
      <GraphQLEndpoint />
      <RequestManager>
        <RunQueryButton />
      </RequestManager>
    </Container>
  </AppContext.Provider>
);

export default App;
