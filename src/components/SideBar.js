import React from "react";
import { FaTh, FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "../css/SideBar.module.css";

const Sidebar = ({ children }) => {
  const menuItems = [
    {
      path: "/",
      name: "Welcome",
      icon: <FaTh />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaUserAlt />,
    },
    {
      path: "/order",
      name: "Order",
      icon: <FaUserAlt />,
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaUserAlt />,
    },
    {
      path: "/signup",
      name: "Signup",
      icon: <FaUserAlt />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <div className={styles.topSection}>
          <h1 className={styles.logo}>Logo</h1>
          <div className={styles.bars}>
            <FaBars />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={styles.link}
            activeClassName={styles.active}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.linkText}>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Sidebar;
