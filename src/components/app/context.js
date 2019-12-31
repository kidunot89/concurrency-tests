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
  const [currentActionType, setCurrentActionType] = useState(null);

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
      const currentRequest = requests[selectedRequest];
      let newRequest;
      switch (field) {
        case 'batch':
          newRequest = Object.assign(currentRequest, { [field]: !currentRequest[field] });
          break;
        default:
          newRequest = Object.assign(currentRequest, { [field]: e.target.value });
          break;
      }
      updateRequests(requests.map((request, index) => (index === selectedRequest) ? newRequest : request));
    };
  };

  const addRequest = (name, options = {} ) => {
    requests.push({
      ...{
        actions: [],
        batch: false,
      },
      ...options,
      name,
    });

    updateRequests(requests);
    if (false === selectedRequest) {
      selectRequest(name);
    }
  };

  const updateRequestName = (selectedIndex, newName) => {
    const oldRequest = requests[selectedIndex];
    let newRequest = Object.assign(oldRequest, { name: newName });
    updateRequests(requests.map((request, index) => (index === selectedIndex) ? newRequest : request));
  }

  const removeRequest = (selectedIndex) => {
    if (1 === requests.length && 0 === selectedIndex) {
      selectRequestIndex(initialState.selectedRequest);
    }
    updateRequests(requests.filter((_, index) => index !== selectedIndex));
  };

  const addNewAction = (type, variables) => {
    const currentRequest = requests[selectedRequest];
    let actions;
    if (currentRequest.batch) {
      actions = currentRequest.actions;
      actions.push({ type, variables }); 
    } else {
      actions = [{ type, variables }];
    }

    const newRequest = Object.assign(currentRequest, { actions });
    updateRequests(requests.map((request, index) => (index === selectedRequest) ? newRequest : request));
  };

  const removeAction = (selectedIndex) => {
    const currentRequest = requests[selectedRequest];
    const actions = currentRequest.actions.filter((_, index) => index !== selectedIndex);

    const newRequest = Object.assign(currentRequest, { actions });
    updateRequests(requests.map((request, index) => (index === selectedRequest) ? newRequest : request));
  };

  return {
    endpoint,
    requests,
    selectedRequest,
    updateEndpoint,
    updateRequests,
    selectRequest,
    addRequest,
    updateRequestName,
    removeRequest,
    selectRequestIndex,
    getRequestFieldValue,
    getRequestFieldHandler,
    currentActionType,
    setCurrentActionType,
    clearActionType: () => setCurrentActionType(null),
    addNewAction,
    removeAction,
    currentRequest: false !== selectedRequest ? requests[selectedRequest] : null,
  };
}

const AppContext = React.createContext(null);

export default AppContext;