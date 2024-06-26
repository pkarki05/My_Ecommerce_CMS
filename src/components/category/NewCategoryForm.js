import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

function NewCategoryForm() {
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
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

  const handleOnSubmit =async (e) => {
    e.preventDefault();
    // console.log(form);
    const slug = slugify(form.name, { lower: true, trim: true });
    console.log('slugify',form.name)
    const urlPromises = image.map((files) => handleImageUpload(files));
    const urls = await Promise.all(urlPromises);
    const catObj = { ...form, slug, thumbnail:urls };

    dispatch(addCategoryAction(catObj));
    setForm({ status: "Inactive",  });
  };
  const handleImageUpload = async (imageDetail) => {
    //image upload
    const uniqueFileName = `${Date.now()}-${imageDetail.name}`;
    return new Promise((resolve, reject) => {

    const storageRef = ref(storage, `category/images/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageDetail);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        
      },
      (error) => {
        console.log("Error uploading");
        toast.error(error.message);
        reject(error);

        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};
  const handleImageAttached = (e) => {
    const { files } = e.target;
    console.log({ files });
    setImage([...files]);
  };

  return (
    <div className="p-3 ">
      <Form
        onSubmit={handleOnSubmit}
        className="border p-3 ms-1 me-1 shadow-lg"
      >
        <Row className="d-flex  align-items-center">
          <Col className="d-flex justify-content-center">
            <Form.Check // prettier-ignore
              type="switch"
              label="Status"
              name="status"
              onChange={handleOnChange}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Enter Category"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col className="d-flex justify-content-center ">
                    <Form.Control
                      // checked={form.status === "Active"}
                      type="file"
                      multiple
                      name="images"
                      onChange={handleImageAttached}
                      //   checked={form.status === "Active"}
                    />


          </Col>

          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Category
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewCategoryForm;
