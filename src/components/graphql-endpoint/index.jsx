import React, { useContext, useState } from 'react';
import { get } from 'lodash';
import {
  Col,
  FormGroup,
  FormInput,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Row,
} from 'shards-react';

import AppContext from '../app/app-context';
import axiosHelper, { VALID_URI_QUERY } from '../../utils/axios';

const inputGroupStyle = {
  display: 'flex',
  maxWidth: '66vw',
}

const labelStyle = {
  marginRight: 'auto',
}

const GraphQLEndpoint = () => {
  const { endpoint, updateEndpoint } = useContext(AppContext);
  const [uriIsValid, updateUriValidity] = useState(false);

  const uriStatusStyle = {
    fontSize: '1.25em',
    color: 'green',
    opacity: uriIsValid ? 1 : 0,
  };

  const validateUri = (e) => {
    console.log('validateUri');
    updateEndpoint(e.target.value);

    axiosHelper.nextRequest(e.target.value, VALID_URI_QUERY)
      .then((result) => {
        if (! get(result, 'data.errors')) {
          updateUriValidity(true)
        } else {
          updateUriValidity(false)
        }
      })
      .catch(() => updateUriValidity(false));
  };

  return (
    <Row>
      <Col>
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>GraphQL Endpoint: </InputGroupText>
          </InputGroupAddon>
          <FormInput
            id="uri"
            value={endpoint}
            onChange={validateUri}
          />
          <InputGroupAddon type="append">
            <InputGroupText>{uriIsValid ? '\u2714' : '\u2718'}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default GraphQLEndpoint;
