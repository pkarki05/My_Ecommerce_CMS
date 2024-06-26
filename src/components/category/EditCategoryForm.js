import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";

function EditCategoryForm() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const dispatch = useDispatch();
  const [form, setForm] = useState({ status: "Inactive" });
  const { selectedCategory } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCategory);
    // console.log(selectedPaymentOpt);
  }, [selectedCategory]);

  useEffect(() => {
    // This cleanup function runs when the component unmounts
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);
  

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

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    //handle file upload before submit the form
let thumbnail=form.thumbnail;
if(image){
  thumbnail=await handleImageUpload(image)
}
const newObj={...form, thumbnail}

    dispatch(addCategoryAction(newObj));
  };
  const handleImgDelete=()=>{
    setForm({
      ...form,
     thumbnail:"",
    })
  }
  const handleImageAttached = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
  
      // If you also want to keep the file in state to upload it later
      setImage(file); // Assuming you have a state [file, setFile] = useState(null);
    }
  }

  return (
    <div className="p-3 ">
      <Form
        onSubmit={handleOnSubmit}
        className="border p-3 ms-1 me-1 shadow-lg"
      >
        <Row className="d-flex  align-items-center">
          <Col className="d-flex justify-content-center">
            <Form.Check
              checked={form?.status === "Active"}
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
                placeholder="Enter Payment"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
          <div className="m-2 border">
          {imagePreviewUrl && <img src={imagePreviewUrl} 
          alt="Preview" style={{ width: "150px" }} />}

          </div>
          </Col>
          

          { form.thumbnail && form.thumbnail!=='' ? (
             <Col className="d-flex justify-content-center">
             <div className="position-relative p-2 border image-container">
               <img src={form.thumbnail} alt="" width="150px" />
               <RiDeleteBin2Line className="position-absolute top-0 end-0 delete-btn" style={{ cursor: 'pointer' }} onClick={handleImgDelete} />
             </div>
           </Col>
           

             ):(

<Form.Group className="mb-3">
            <Form.Control
              // checked={form.status === "Active"}
              type="file"
              multiple
              name="images"
              onChange={handleImageAttached}
              //   checked={form.status === "Active"}
            />
           
          </Form.Group>)}
         </Row>
         <Row className="mt-3">

        
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

