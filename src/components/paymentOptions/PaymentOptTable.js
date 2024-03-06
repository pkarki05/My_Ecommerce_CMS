import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CustomModal from "../custom-modal/CustomModal";
import { setModalShow } from "../../redux/modal-state/modalSlice";

import EditPaymentOptForm from "./EditPaymentOptForm";
import { deletePaymentOptionAction, fetchPaymentOptionsAction } from "../../redux/paymentOptions/paymentOptionsAction";
import { setSelectedPaymentOpt } from "../../redux/paymentOptions/paymentOptionsSlice";
import { Image } from "react-bootstrap";

function PaymentOptTable({ show, onHide }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
  const { paymentOptList } = useSelector((state) => state.paymentOptions);

  const handleEdit = (paymentOptionsDetail) => {
    dispatch(setSelectedPaymentOpt(paymentOptionsDetail));
    dispatch(setModalShow(true));
    console.log(setModalShow);
  };
  useEffect(() => {
    dispatch(fetchPaymentOptionsAction());
  }, []);

  const handleDelete = (paymentSlug) => {
    // Show confirmation modal or alert before proceeding with deletion
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deletePaymentOptionAction(paymentSlug));
      // Optionally, you may reset the form state after deletion
      setForm({});
    }
  };
  return (
    <>
      <CustomModal title="Update Payment Options">
        <EditPaymentOptForm />
      </CustomModal>
      <Table striped bordered hover variant="dark" className="m-2">
        <thead>
          <tr>
            <th>#</th>
            <th> Payment Name</th>
            <th>Logo</th>
            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentOptList.map((payment, index) => {
            return (
              <tr key={payment.slug}>
                <td>{index + 1}</td>


                <td>{payment.name}</td>
                <td>
                <Image width='120px' src={payment.url}/>

                </td>
                <td>
                  <span className={payment.status}> {payment.status}</span>
                </td>

               
                <td>
                  <div className="d-flex gap-3">
                    <Button variant="info" onClick={() => handleEdit(payment)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(payment.slug)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default PaymentOptTable;
