import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "react-bootstrap/Button";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <AdminLayout title="Products">
      <div className="text-end me-5">
        <Link to="/product/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <ProductTable />
    </AdminLayout>
  );
};

export default Product;
