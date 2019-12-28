import React, { useState } from 'react';
import { findIndex } from 'lodash';

export const initialState = {
  endpoint: '',
  requests: [],
  selectedRequest: false
}

export function useAppState(initialState) {
  const [endpoint, updateEndpoint] = useState(initialState.endpoint);
  const [requests, updateRequests] = useState(initialState.requests);
  const [selectedRequest, selectRequestIndex] = useState(initialState.selectedRequest);

  const selectRequest = (name) => {
    const requestIndex = findIndex(requests, (request) => request.name === name);
    if ( -1 !== requestIndex ) {
      return selectRequestIndex(requestIndex);
    }

    return false;
  }

  const getRequestFieldValue = (field) => {
    return requests[selectedRequest][field];
  }

  const getRequestFieldHandler = (field) => {
    return (e) => {
      requests[selectedRequest][field] = e.target.value;
      updateRequests(requests);
    };
  };

  const addRequest = (name, options = {} ) => {
    requests.push({
      ...{ query: '', variables: '', tests: '' },
      ...options,
      name,
    });

    updateRequests(requests);
    if (false === selectedRequest) {
      selectRequest(name);
    }
  };

  const removeRequest = (name) => {
    const newRequests = requests;

    const requestIndex = findIndex(requests, (request) => request.name === name);
    if ( -1 !== requestIndex ) {
      delete newRequests[requestIndex];

      updateRequests(newRequests);

      return true;
    }

    return false;
  };

  return {
    endpoint,
    requests,
    selectedRequest,
    updateEndpoint,
    updateRequests,
    selectRequest,
    addRequest,
    removeRequest,
    selectRequestIndex,
    getRequestFieldValue,
    getRequestFieldHandler,
  };
}

const AppContext = React.createContext(null);

export default AppContext;