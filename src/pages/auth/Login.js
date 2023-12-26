import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custom-input/CustomInput";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useEffect, useState } from "react";
import { getUserInfo, loginAdminUser } from "../../redux/auth/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const { user } = useSelector((state) => state.userInfo);
  console.log("User", user.uid);
  console.log("User", user);
  useEffect(() => {
    if (user.uid) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
 
  
  const inputFields = [
    {
      label: "E-mail",
      name: "email",
      type: "email",
      placeholder: "abc@admin.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    console.log("Form data", form);
    dispatch(loginAdminUser(form));
  };
  return (
    <>
      <Header  />
      <Form
        onSubmit={handleOnsubmit}
        className="vh-100"
        style={{ backgroundColor: "#ffe" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center d-grid">
                  <h3 className="mb-5">Sign in</h3>
                  {inputFields.map((items) => (
                    <CustomInput {...items} onChange={handleChange} />
                  ))}

                  <Button className="primary  " type="submit">
                    Login
                  </Button>

                  <hr classNameName="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <Footer />
    </>
  );
}

export default Login;
