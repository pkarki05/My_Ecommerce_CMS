import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CustomModal from "../custom-modal/CustomModal";
import NewCategoryForm from "./NewCategoryForm";

function CategoryTable({ show, onHide }) {
  const { categoryList } = useSelector((state) => state.category);
  const handleEdit = () => {
    console.log("clicked");
  };
  return (
    <>
      <CustomModal show={true} title="Update Category">
        <NewCategoryForm />
      </CustomModal>
      <Table striped bordered hover variant="dark" className="p-2">
        <thead>
          <tr>
            <th>#</th>
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

                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <span className={category.status}> {category.status}</span>
                </td>
                <td>
                  <Button variant="info" onClick={handleEdit}>
                    Edit
                  </Button>
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
