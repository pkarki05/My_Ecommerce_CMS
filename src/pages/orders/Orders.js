import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        const ordersList = [];
        querySnapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersList);
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminLayout title="Orders">
      <div className="d-flex m-3 p-3">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer's Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <th scope="row">{index + 1}</th>
                <td>{`${order.user.fname} ${order.user.lname}`}</td>
                <td>{order.user.email}</td>
                <td>{order.user.phone}</td>
                <td>${(order.amount/100)}</td>
                <td><p className='bg-success text-white p-1 m-1 rounded'>{order.status}</p></td>
                <td><p className='bg-info text-white p-1 m-1 rounded'>{new Date(order.createdAt.seconds * 1000).toLocaleString()}</p></td>
                <td>
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.title}</td>
                          <td>{item.ParentCategory}</td>
                          <td>{item.cartQuantity}</td>
                          <td>${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Orders;
