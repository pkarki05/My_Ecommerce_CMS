import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custom-input/CustomInput";
import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { createNewAdminUser } from "../../redux/auth/UserAction";

function Login() {
  const [form, setForm] = useState({});
  const inputFields = [
    {
      label: "First Name *",
      name: "fname",
      type: "text",
      placeholder: "Sam",
      required: true,
    },
    {
      label: "Last Name *",
      name: "lname",
      type: "text",
      placeholder: "Doe",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "phone",
      placeholder: "041******",
    },
    {
      label: "E-mail *",
      name: "email",
      type: "email",
      placeholder: "abc@admin.com",
      required: true,
    },
    {
      label: "Password *",
      name: "password",
      type: "password",
      placeholder: "***********",
      required: true,
    },
    {
      label: "Confirm Password *",
      name: "confirmPassword",
      type: "password",
      placeholder: "***********",
      required: true,
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnsubmit =async (e) => {
    e.preventDefault();
    console.log("Form data", form);
    await createNewAdminUser(form);
  };
  return (
    <>
      <AdminLayout title="Register Admin">
        <Form onSubmit={handleOnsubmit} className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center d-grid">
                    <h3 className="mb-5">Register</h3>
                    {inputFields.map((items) => (
                      <CustomInput
                        key={items.name}
                        {...items}
                        onChange={handleChange}
                      />
                    ))}

                    <Button className="primary  " type="submit">
                      Submit
                    </Button>

                    <hr className="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </AdminLayout>
    </>
  );
}

export default Login;
