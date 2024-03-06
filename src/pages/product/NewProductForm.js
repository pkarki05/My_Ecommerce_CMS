import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custom-input/CustomInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../../redux/product/productAction";
import slugify from "slugify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function NewProductForm() {
  const { categoryList } = useSelector((state) => state.category);
  const [form, setForm] = useState({ status: "Inactive" });
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate=useNavigate()
  const inputFields = [
    {
      label: "Product Name *",
      name: "title",
      type: "text",
      placeholder: "Laptop",
      required: true,
    },
    
    {
      label: "SKU *",
      name: "sku",
      type: "text",
      placeholder: "SKU100",
      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "$100",
      required: true,
    },
    {
      label: "Quantity *",
      name: "quantity",
      type: "number",
      placeholder: "99",
      required: true,
    },
    {
      label: "Sales Price *",
      name: "salesPrice",
      type: "number",
      placeholder: "$99",
      required: true,
    },
    {
      label: "Sales Start At ",
      name: "salesStartAt",
      type: "date",
    },
    {
      label: "Sales End At ",
      name: "salesEndAt",
      type: "date",
    },
    {
      label: "Product Description *",
      name: "description",
      type: "text",
      as: "textarea",
      required: true,
      rows: 5,
    },
  ];
  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    // console.log(name, value, checked);
    if (name === "status") {
      value = checked ? "Active" : "Inactive";
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const slug = slugify(form.title, { lower: true, trim: true });

    // const imageDetail = image[0];
    // let imageUrl;
    // try {
    //   imageUrl = await handleImageUpload(imageDetail);
    //   console.log("Image URL", imageUrl);
    // } catch (e) {
    //   console.log("Error uploading image", e.message);
    // }
    const urlPromises = image.map((files) => handleImageUpload(files));
    const urls = await Promise.all(urlPromises);
    // console.log("urlPromises", urlPromises);
    // console.log("url", urls);
    // return;

    const productObj = { ...form, slug, imageUrls: urls };
    dispatch(addProductAction(productObj));
    navigate('/product')

  };
  const handleImageAttached = (e) => {
    const { files } = e.target;
    console.log({ files });
    setImage([...files]);
  };
  //to handle image upload
  const handleImageUpload = async (imageDetail) => {
      //image upload
      const uniqueFileName = `${Date.now()}-${imageDetail.name}`;
      return new Promise((resolve, reject) => {

      const storageRef = ref(storage, `product/images/${uniqueFileName}`);
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
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
  return (
    <>
      <Form
        onSubmit={handleOnsubmit}
        className="border p-3 mt-3 shadow rounded"
      >
        <div className="container ">
          <div className=" d-flex justify-content-center ">
            <div className="col-12 col-md-8 col-lg-8  ">
              <div className="card shadow " style={{ borderRadius: "1rem" }}>
                <div className="card-body  ">
                  <h3 className="mb-5">Add Product</h3>
                  <Form.Group className="mb-3">
                    <Form.Check
                      // checked={form.status === "Active"}
                      type="switch"
                      label="Status"
                      name="status"
                      onChange={handleChange}
                      //   checked={form.status === "Active"}
                    />
                    <Form.Select
                      required
                      name="ParentCategory"
                      onChange={handleChange}
                    >
                      <option>Select Category *</option>
                      {categoryList.map((cat, i) => (
                        <option value={cat.slug} key={cat.i}>
                          {cat.name}
                        </option>
                      ))}
                      {/* {categoryList.map(cat,index={
                        return 
                         <option value={cat.slug}>One</option>


                      })} */}
                    </Form.Select>
                  </Form.Group>

                  {inputFields.map((items) => (
                    <CustomInput
                      key={items.name}
                      {...items}
                      onChange={handleChange}
                    />
                  ))}
                  <Form.Group className="mb-3">
                    <Form.Control
                      // checked={form.status === "Active"}
                      type="file"
                      multiple
                      name="images"
                      onChange={handleImageAttached}
                      //   checked={form.status === "Active"}
                    />
                    <ProgressBar
                      animated
                      now={progress}
                      label={`${progress}%`}
                    />
                  </Form.Group>
                  <div className="d-flex row p-2 mx-5">
                    <Button className="primary  " type="submit">
                      Add
                    </Button>
                  </div>

                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default NewProductForm;
