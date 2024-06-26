import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { TbPackages } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { GoCodeReview } from "react-icons/go";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import SimpleBarChart from "../../components/charts/SimpleBarChart";
import { BiSolidCategoryAlt } from "react-icons/bi";


const Dashboard = () => {
  

  return (
    <AdminLayout title='Dashboard'>
      <div className=" main-cards">
        <div className="dash-card ">
          <div className="card-inner ">
            <h3>PRODUCTS</h3>
            <TbPackages className="card_icon" />
          </div>
          <h1>100</h1>
        </div>
        <div className="dash-card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BiSolidCategoryAlt className="card_icon"/>
          </div>
          <h1>10</h1>
        </div>
        <div className="dash-card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <HiUserGroup className="card_icon" />
          </div>
          <h1>44</h1>
        </div>
        <div className="dash-card">
          <div className="card-inner">
            <h3>REVIEWS</h3>
            <GoCodeReview className="card_icon"/>
          </div>
          <h1>66</h1>
        </div>
      </div>
      <div className="charts" >
        
         <SimpleLineChart/>

            <SimpleBarChart/>
        </div>
       
    </AdminLayout>
  );
};

export default Dashboard;
