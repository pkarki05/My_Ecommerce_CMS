import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import NewCategoryForm from "../../components/category/NewCategoryForm";
import CategoryTable from "../../components/category/CategoryTable";

const Category = () => {
  return (
    <AdminLayout title="Categories">
      <NewCategoryForm />
      <CategoryTable />
    </AdminLayout>
  );
};

export default Category;
