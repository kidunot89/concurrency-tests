import React, { useState, useContext } from 'react';
import {
  FormTextarea,
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
} from 'shards-react';

import AppContext from '../app/context';
import RequestManagerContext from './context';
import MutationModal from './mutations';

const Editor = () => {
  const {
    getRequestFieldHandler,
    currentActionType,
    setCurrentActionType,
    clearActionType,
    currentRequest,
    removeAction,
  } = useContext(AppContext);
  const { activeTab } = useContext(RequestManagerContext);
  const [showModal, toggleModal] = useState(false);

  const onToggleModal = (show) => {
    toggleModal(show);
    clearActionType();
  }

  const actionHandler = (type) => {
    return (e) => {
      e.preventDefault();
      setCurrentActionType(type);
      toggleModal(true);
    };
  };

  return activeTab === 'tests' ? (
    <>
      <p className="float-right mb-2 h4">Tests</p>
      <FormTextarea className="mb-3" onChange={getRequestFieldHandler('tests')} />
    </>
  ) : (
    <Container>
      <Row>
        <Col sm="12" md="4">
          <Nav vertical>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('addToCart')}>Add To Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('updateItemQuantities')}>Update Item Quantity</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('removeItemsFromCart')}>Remove Items</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('restoreCartItems')}>Restore Items</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('emptyCart')}>Empty Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('applyCoupon')}>Apply Coupon</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={actionHandler('removeCoupons')}>Remove Coupons</NavLink>
            </NavItem>
          </Nav>
          <MutationModal open={showModal} type={currentActionType} toggle={onToggleModal} />
        </Col>
        <Col>
          <ListGroup flush className="mt-3">
            <ListGroupItemHeading>Request Mutations</ListGroupItemHeading>
            {currentRequest.actions.map(({ type, variables }, index) => (
              <ListGroupItem key={`${type}-${index}`}>
                <p><em>Mutation: </em>{type}</p>
                <p><em>Variables: </em>{JSON.stringify(variables)}</p>
                <Button theme="danger" onClick={() => removeAction(index)}>Remove</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
};

export default Editor;
