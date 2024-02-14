import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CustomModal from "../../components/custom-modal/CustomModal";
import { setModalShow } from "../../redux/modal-state/modalSlice";

import { setselectedProduct } from "../../redux/product/productSlice";
import {
  deleteProductAction,
  fetchProductAction,
} from "../../redux/product/productAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductTable({ show, onHide }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
  const { productList } = useSelector((state) => state.product);
  const [displayList, setDisplayList] = useState([]);

  // const handleEdit = (productDetail) => {
  //   dispatch(setselectedProduct(productDetail));
  //   // dispatch(setModalShow(true));
  //   // console.log(setModalShow);
  // };
  useEffect(() => {
    dispatch(fetchProductAction());
  }, []);
  useEffect(() => {
    setDisplayList(productList);
  }, [productList, dispatch]);

  const handleDelete = (categorySlug) => {
    // Show confirmation modal or alert before proceeding with deletion
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteProductAction(categorySlug));
      // Optionally, you may reset the form state after deletion
      setForm({});
    }
  };
  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filteredList = productList.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayList(filteredList);
  };

  return (
    <>
      {/* <CustomModal title="Update Category">
        <EditCategoryForm />
      </CustomModal> */}
      <div>
        <Form.Control
          placeholder="Search by Title"
          className="w-50 mb-3 mx-3 shadow"
          onChange={handleOnSearch}
        />
      </div>
      <Table striped bordered hover variant="dark" className="m-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th> Title</th>
            <th> Quantity</th>
            <th> Price</th>
            <th> Sales</th>
            <th>Slug</th>
            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((product, index) => {
            return (
              <tr key={product.slug}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.thumbnail} width="120px" />
                </td>

                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.salesPrice}</td>
                <td>{product.slug}</td>
                <td>
                  <span className={product.status}> {product.status}</span>
                </td>
                <td>
                  <div className="d-flex gap-3">
                    <Link to={`/product/edit/${product.slug}`}>
                      <Button variant="info">
                        {/* <Button variant="info" onClick={() => handleEdit(category)}> */}
                        Edit
                      </Button>
                    </Link>

                    <Button variant="danger">
                      {/* <Button
                      variant="danger"
                      onClick={() => handleDelete(category.slug)}
                    > */}
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

export default ProductTable;
