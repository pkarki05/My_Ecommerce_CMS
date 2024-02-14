import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";

function EditCategoryForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
  const { selectedCategory } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCategory);
    // console.log(selectedCategory);
  }, [selectedCategory]);

  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(name, value, checked);
    if (name === "name") {
      //do something
      setForm({ ...form, [name]: value });
    } else if (name === "status") {
      setForm({ ...form, [name]: checked ? "Active" : "Inactive" });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addCategoryAction(form));
  };

  return (
    <div className="p-3 ">
      <Form
        onSubmit={handleOnSubmit}
        className="border p-3 ms-1 me-1 shadow-lg"
      >
        <Row className="d-flex  align-items-center">
          <Col className="d-flex justify-content-center">
            <Form.Check
              checked={form.status === "Active"}
              type="switch"
              label="Status"
              name="status"
              onChange={handleOnChange}
              //   checked={form.status === "Active"}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={form.name}
                name="name"
                type="text"
                placeholder="Enter Category"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>

          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditCategoryForm;
