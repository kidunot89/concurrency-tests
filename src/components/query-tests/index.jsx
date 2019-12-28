import React, { useState } from 'react';
import { debounce, get } from 'lodash';

import RequestBuilder from './request-builder';
import requestManager, { VALID_URI_QUERY } from '../../utils/request-manager';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '90vh',
};

const inputGroupStyle = {
  display: 'flex',
  maxWidth: '66vw',
}

const labelStyle = {
  marginRight: 'auto',
}

const submitButtonStyle = {
  marginTop: 'auto',
  padding: '3em',
  border: 'none',
  fontSize: '1.3em',
}

const RunTests = () => {
  const [uri, setUri] = useState('');
  const [uriIsValid, updateUriValidity] = useState(false);

  const uriStatusStyle = {
    fontSize: '1.25em',
    color: 'green',
    opacity: uriIsValid ? 1 : 0,
  };

  const validateUri = (e) => {
    console.log('validateUri');
    setUri(e.target.value);

    requestManager.nextRequest(e.target.value, VALID_URI_QUERY)
      .then((result) => {
        if (! get(result, 'data.errors')) {
          updateUriValidity(true)
        } else {
          updateUriValidity(false)
        }
      })
      .catch(() => updateUriValidity(false));
  };

  const sendConcurrentQueries = (e) => {
    console.log('Requests sent');
  }

  return (
    <div style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="uri" style={labelStyle}>GraphQL Endpoint</label>
        <input
          type="text"
          name="uri"
          value={uri}
          onChange={validateUri}
        />
        <span style={uriStatusStyle}>&#10003;</span>
      </div>
      <div>
        <h2>GraphQL Requests</h2>
        <RequestBuilder />
      </div>
      <input
        type="submit"
        value="Begin Test"
        style={submitButtonStyle}
        onClick={sendConcurrentQueries}
      />
    </div>
)
};

export default RunTests;
