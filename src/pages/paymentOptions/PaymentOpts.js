import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import NewPaymentOptForm from "../../components/paymentOptions/NewPaymentOptForm";
import PaymentOptTable from "../../components/paymentOptions/PaymentOptTable";

const PaymentOpts = () => {
  return (
    <AdminLayout title='Payment Options'>
       <NewPaymentOptForm />
      <PaymentOptTable />
    </AdminLayout>
  );
};

export default PaymentOpts;
