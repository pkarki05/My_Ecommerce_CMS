import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { setUser } from "../../redux/auth/userSlice";
import "./layout.css";

function Header({ admin }) {
  const { user } = useSelector((state) => state.userInfo);
  console.log(user);
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      console.log("User has been logged out from firebase auth");
      // clear the storage of redux
      dispatch(setUser({}));
    });
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        {user?.uid ? (
          <div className=" ">
            <Navbar.Brand href="#home">Admin CMS</Navbar.Brand>
            {/* <span className="admin-greeting">Welcome! {admin} </span> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link className="nav-link" to="#!" onClick={handleOnLogout}>
                  Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
