import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CustomModal from "../custom-modal/CustomModal";
import NewCategoryForm from "./NewCategoryForm";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import { setModalShow } from "../../redux/modal-state/modalSlice";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../redux/category/categoryAction";
import EditCategoryForm from "./EditCategoryForm";

function CategoryTable({ show, onHide }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
  const { categoryList } = useSelector((state) => state.category);

  const handleEdit = (categoryDetail) => {
    dispatch(setSelectedCategory(categoryDetail));
    dispatch(setModalShow(true));
    console.log(setModalShow);
  };
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const handleDelete = (categorySlug) => {
    // Show confirmation modal or alert before proceeding with deletion
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(categorySlug));
      // Optionally, you may reset the form state after deletion
      setForm({});
    }
  };
  return (
    <>
      <CustomModal title="Update Category">
        <EditCategoryForm />
      </CustomModal>
      <Table striped bordered hover variant="dark" className="m-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th> Name</th>
            <th>Slug</th>
            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category, index) => {
            return (
              <tr key={category.slug}>
                <td>{index + 1}</td>
                <td>
                  <img src={category.thumbnail} width="120px" />
                </td>

                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <span className={category.status}> {category.status}</span>
                </td>
                <td>
                  <div className="d-flex gap-3">
                    <Button variant="info" onClick={() => handleEdit(category)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(category.slug)}
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

export default CategoryTable;
