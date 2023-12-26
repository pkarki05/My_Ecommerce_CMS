import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdReviews } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";

import "../../App.css";
function SiteBar() {
  const SiteLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icons: <MdDashboard />,
    },
    {
      label: "Category",
      path: "/categories",
      icons: <MdCategory />,
    },
    {
      label: "Product",
      path: "/product",
      icons: <FaProductHunt />,
    },
    {
      label: "Payment Options",
      path: "/payment-options",
      icons: <MdOutlinePayment />,
    },
    {
      label: "Orders",
      path: "/orders",
      icons: <FaShippingFast />,
    },
    {
      label: "Customers",
      path: "/customers",
      icons: <IoPeople />,
    },

    {
      label: "Reviews",
      path: "/reviews",
      icons: <MdReviews />,
    },
  ];
  return (
    <div>
      <nav>
        <div className="p-2 fs-3 align-item-center text-light">
          Admin Account
        </div>
        <hr />
        <div>
          <ul className="list-unstyled ">
            {SiteLinks.map(({ label, path, icons }) => (
              <Link to={path} className="nav-link">
                <li className="p-3 fw-bold text-center admin-items text-light">
                  <div className="d-flex align-items-center nav-link">
                    <Col
                      sm={4}
                      className=" icons fs-3 row-no-gutters d-flex align-items-center justify-content-end "
                    >
                      {icons}
                    </Col>
                    <Col sm={8} className="">
                      {label}
                    </Col>
                  </div>
                </li>
              </Link>
            ))}
            <hr />
            <Link className="nav-link" to="/profile">
              <li className="p-3 fw-bold text-center admin-items text-light">
                <div className="d-flex align-items-center nav-link">
                  <Col
                    sm={4}
                    className=" icons fs-3 row-no-gutters d-flex align-items-center justify-content-end "
                  >
                    <CgProfile />
                  </Col>
                  <Col sm={8} className="">
                    Profile
                  </Col>
                </div>
              </li>
            </Link>

            <Link className="nav-link" to="/admin-register">
              <li className="p-3 fw-bold text-center admin-items text-light">
                <div className="d-flex align-items-center nav-link">
                  <Col
                    sm={4}
                    className=" icons fs-3 row-no-gutters d-flex align-items-center justify-content-end "
                  >
                    <FaRegAddressCard />
                  </Col>
                  <Col sm={8} className="">
                    Admin Register
                  </Col>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SiteBar;
