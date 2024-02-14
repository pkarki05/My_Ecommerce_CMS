import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewProductForm from "../../pages/product/NewProductForm";

function AddNewProduct() {
  return (
    <AdminLayout title="New Product Form">
      <div>
        <Link to="/product">
          <Button variant="secondary ms-2">&lt;Go Back</Button>
        </Link>
      </div>
      <NewProductForm />
    </AdminLayout>
  );
}

export default AddNewProduct;
