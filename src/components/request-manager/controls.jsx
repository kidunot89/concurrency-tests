import React, { useContext } from 'react';
import { Nav, NavItem, NavLink, FormCheckbox } from 'shards-react';

import AppContext from '../app/context';
import RequestManagerContext from './context';

const Controls = () => {
  const { requests, selectedRequest, getRequestFieldHandler } = useContext(AppContext);
  const { activeTab, selectTab } = useContext(RequestManagerContext);
  return (
    <Nav fill tabs>
      <NavItem active={'query' === activeTab}>
        <NavLink href="#" onClick={() => selectTab('query')} active={'query' === activeTab}>
          Query
        </NavLink>
      </NavItem>
      <NavItem active={'tests' === activeTab}>
        <NavLink href="#" onClick={() => selectTab('tests')} active={'tests' === activeTab}>
          Tests
        </NavLink>
      </NavItem>
      <NavItem>
        <FormCheckbox
          toggle
          checked={requests[selectedRequest].batch}
          onChange={getRequestFieldHandler('batch')}
        >
          Batch Request
        </FormCheckbox>
      </NavItem>
    </Nav>
  )
}

export default Controls;
