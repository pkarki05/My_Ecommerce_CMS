import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SiteBar from "./SiteBar";
import { useSelector } from "react-redux";

function AdminLayout({ children, title }) {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <div>
      <div className="admin-layout d-flex ">
        <div className="w-25 bg-primary ">
          <SiteBar />
        </div>
        <div className="right w-75 ">
          <Header admin={user.fname} />
          <h1 className="p-2"> {title}</h1>
          <hr />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
