import React, { useContext, useState, useEffect } from 'react';
import { get } from 'lodash';
import {
  Col,
  FormInput,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Row,
} from 'shards-react';

import AppContext from '../app/context';
import axiosHelper, { VALID_URI_QUERY } from '../../utils/axios';

const GraphQLEndpoint = () => {
  const { endpoint, updateEndpoint } = useContext(AppContext);
  const [endpointIsValid, validateEndpoint] = useState(null);

  const onChangeEndpoint = (e) => {
    updateEndpoint(e.target.value);

    axiosHelper.nextRequest(e.target.value, VALID_URI_QUERY)
      .then((response) => {
        if (!get(response, 'data.errors')) {
          return validateEndpoint(true);
        } else {
          return validateEndpoint(false);
        }
      })
      .catch(() => validateEndpoint(false));
  };

  useEffect(() => {
    if (null === endpointIsValid) {
      validateEndpoint(false);
      onChangeEndpoint({ target: { value: endpoint } });
    }
  }, [endpointIsValid, onChangeEndpoint, endpoint]);

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
            onChange={onChangeEndpoint}
          />
          <InputGroupAddon type="append">
            <InputGroupText>{endpointIsValid ? '\u2714' : '\u2718'}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default GraphQLEndpoint;
