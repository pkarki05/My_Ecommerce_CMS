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
import {sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";

import { toast } from "react-toastify";
import { auth } from "../../firebase/firebaseConfig";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [currentView, setCurrentView] = useState("login");



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
 const handleForgotPassword = async (e) => {
  e.preventDefault();

  const { email } = form;

  
    try {
      

      // Email exists, send password reset email
      await sendPasswordResetEmail(auth, email);
      toast.success('Email sent successfully!');
      setCurrentView("login");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Failed to send password reset email.");
    }
    toast.error("Please enter your email address.");

  } 
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  // 
  const handleLogin = (e) => {
    // Logic for handling login submissions
    // For example, dispatching the login action
    dispatch(loginAdminUser(form))
  };
  
  
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    currentView === "login" ? handleLogin(e) : handleForgotPassword(e);
  };
  
  return (
    <>
      <Header  />
      
      <Form
        onSubmit={handleOnSubmit}
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
                  <h3 className="mb-5">{currentView==='login'?'Sign in':'Forgot Password?'}</h3>
                  {currentView==='login' && (
                    <>
                    {inputFields.map((items) => (
                    <CustomInput {...items} onChange={handleChange} />
                  ))}

                  <Button className="primary  " type="submit">
                    Login
                  </Button>
                  <div className="mt-3">
                <a href="#" onClick={()=>setCurrentView('forgot')}>Forgot password?</a>
                    </div>

                    </>
                  )}
                   {currentView==='forgot' && (
                    <>
                    <CustomInput
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="abc@admin.com"
                  onChange={handleChange}
                />
                <Button className="btn btn-primary" type="submit">
                  Reset Password
                </Button>
                <div className="mt-3">
                  <a href="#" onClick={() => setCurrentView("login")}>
                    Back to login
                  </a>
                </div>
                    </>
                   )}
                   <div className=" d-flex gap-5  mt-3 ">
                    <p>Email:p@k.com</p>
                    <p>Password:11111111</p>
                  </div>

                  

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
