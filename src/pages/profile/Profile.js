import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import CustomInput from '../../components/custom-input/CustomInput';
import { Button, Form } from 'react-bootstrap';
import { addUserAction, createNewAdminUser, updateProfile } from '../../redux/auth/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [form, setForm] = useState({});
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.userInfo)
  useEffect(()=>{
    setForm(user)
  },[user])
  const inputFields = [
    {
      label: "First Name *",
      name: "fname",
      type: "text",
      placeholder: "Sam",
      required: true,
      value:form.fname
    },
    {
      label: "Last Name *",
      name: "lname",
      type: "text",
      placeholder: "Doe",
      required: true,
      value:form.lname

    },
    {
      label: "Phone",
      name: "phone",
      type: "phone",
      placeholder: "041******",
      value:form.phone

    },
    {
      label: "E-mail *",
      name: "email",
      type: "email",
      placeholder: "abc@admin.com",
      required: true,
      value:form.email,
      disabled:true

    },
    // {
    //   label: "Password *",
    //   name: "password",
    //   type: "password",
    //   placeholder: "***********",
    //   required: true,
    //   value:form.password

    // },
    // {
    //   label: "Confirm Password *",
    //   name: "confirmPassword",
    //   type: "password",
    //   placeholder: "***********",
    //   required: true,
    //   value:form.confirmPassword

    // },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnsubmit = async(e) => {
    e.preventDefault();
    console.log("Form data", form);
     dispatch(updateProfile(form));
  };
  return (
    <>
      <AdminLayout title="Profile">
        <Form onSubmit={handleOnsubmit} className="vh-80">
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
                      Update
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

export default Profile
