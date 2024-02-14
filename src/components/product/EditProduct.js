import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewProductForm from "../../pages/product/NewProductForm";
import EditProductForm from "../../pages/product/EditProductForm";

function EditProduct() {
  return (
    <AdminLayout title="Edit Product Form">
      <div>
        <Link to="/product">
          <Button variant="secondary ms-2">&lt;Go Back</Button>
        </Link>
      </div>
      <EditProductForm />
    </AdminLayout>
  );
}

export default EditProduct;
