import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalShow } from "../../redux/modal-state/modalSlice";
function CustomModal({  children, title }) {
  const dispatch = useDispatch();
  const { modalShow } = useSelector((state) => state.modal);

  return (
    <>
      <Modal show={modalShow} onHide={() => dispatch(setModalShow(false))}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
