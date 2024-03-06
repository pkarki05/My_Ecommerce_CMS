import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";
import { addPaymentOptions } from "../../redux/paymentOptions/paymentOptionsAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../../firebase/firebaseConfig";

function NewPaymentOptForm() {
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

  const handleImageUpload = async (imageDetail) => {
    //image upload
    const uniqueFileName = `${Date.now()}-${imageDetail.name}`;
    return new Promise((resolve, reject) => {

    const storageRef = ref(storage, `paymentOptions/images/${uniqueFileName}`);
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
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // setProgress(progress);
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
  setImage(files[0]);
}

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    // console.log(form);
    const slug = slugify(form.name, { lower: true, trim: true });

     const imgUrl= await handleImageUpload(image)
    const paymentOptionsObj = { ...form, slug, url:imgUrl };

    dispatch(addPaymentOptions(paymentOptionsObj));

    setForm({ status: "Inactive" });
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
          
          <Form.Group className="mb-3">
                    <Form.Control
                      // checked={form.status === "Active"}
                      type="file"
                      multiple
                      name="images"
                      onChange={handleImageAttached}
                      //   checked={form.status === "Active"}
                    />
                   
                  </Form.Group>
          

          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Payment
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewPaymentOptForm;
