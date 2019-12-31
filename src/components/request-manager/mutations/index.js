import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'shards-react';

import AddToCart from './add-to-cart';
import UpdateItemQuantities from './update-item-quantities';
import RemoveItemsFromCart from './remove-items-from-cart';
import RestoreCartItems from './restore-cart-items';
import EmptyCart from './empty-cart';
import ApplyCoupon from './apply-coupon';
import RemoveCoupons from './remove-coupons';

function getMutationForm(type, closeModal) {
  switch (type) {
    case 'addToCart':
      return (
        <>
          <ModalHeader>New <em>`addToCart`</em> Mutation</ModalHeader>
          <ModalBody><AddToCart {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'updateItemQuantities':
      return (
        <>
          <ModalHeader>New <em>`updateItemQuantities`</em> Mutation</ModalHeader>
          <ModalBody><UpdateItemQuantities {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'removeItemsFromCart':
      return (
        <>
          <ModalHeader>New <em>`removeItemsFromCart`</em> Mutation</ModalHeader>
          <ModalBody><RemoveItemsFromCart {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'restoreCartItems': 
      return (
        <>
          <ModalHeader>New <em>`restoreCartItems`</em> Mutation</ModalHeader>
          <ModalBody><RestoreCartItems {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'emptyCart':
      return (
        <>
          <ModalHeader>New <em>`emptyCart`</em> Mutation</ModalHeader>
          <ModalBody><EmptyCart {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'applyCoupon':
      return (
        <>
          <ModalHeader>New <em>`applyCoupon`</em> Mutation</ModalHeader>
          <ModalBody><ApplyCoupon {...{ closeModal }} /></ModalBody>
        </>
      );
    case 'removeCoupons':
      return (
        <>
          <ModalHeader>New <em>`removeCoupons`</em> Mutation</ModalHeader>
          <ModalBody><RemoveCoupons {...{ closeModal }} /></ModalBody>
        </>
      );
    default:
      return null;
  }
}

const MutationModal = ({ open, type, toggle }) => {
  const closeModal = () => toggle(!open);
  return (
    <Modal open={open} toggle={closeModal}>
      {getMutationForm(type, closeModal)}
    </Modal>
  );
};

export default MutationModal;
