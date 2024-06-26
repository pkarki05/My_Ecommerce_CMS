import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { TBL_CUSTOMERS } from "../../utils/const";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomerInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, TBL_CUSTOMERS));
        const customerList = [];
        querySnapshot.forEach((doc) => {
          customerList.push({ ...doc.data(), id: doc.id });
        });
        setCustomers(customerList);
      } catch (e) {
        toast.error(e.message);
      }
    };

    getCustomerInfo();
  }, []);

  return (
    <AdminLayout title="Customers">
      <div className="d-flex m-3 p-3">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">E-mail</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <th scope="row">{index + 1}</th>
                <td>{customer.fname}</td>
                <td>{customer.lname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Customers;
