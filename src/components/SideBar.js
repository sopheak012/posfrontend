import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  width: 100%;
  padding: 20px;
`;

const SidebarContainer = styled.div`
  background: #1f1d2b;
  color: #fff;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? "200px" : "50px")};
  transition: all 0.5s;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 15px;
`;

const Logo = styled.h1`
  font-size: 30px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Bars = styled.div`
  display: flex;
  font-size: 25px;
`;

const Link = styled(NavLink)`
  display: flex;
  padding: 10px 15px;
  gap: 15px;
  transition: all 0.5s;
  &:hover,
  &.active {
    background: #ea7c69;
    color: #fff;
  }
`;

const Icon = styled.div`
  font-size: 20px;
`;

const LinkText = styled.div`
  font-size: 20px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const loggedIn = useSelector((state) => state.user.isLogin);

  const menuItem = [
    {
      path: "/",
      name: "Welcome",
      icon: <FaTh />,
    },
    ...(loggedIn
      ? [
          {
            path: "/order",
            name: "Order",
            icon: <FaUserAlt />,
          },
        ]
      : [
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
        ]),
  ];

  return (
    <Container>
      <SidebarContainer isOpen={isOpen}>
        <TopSection>
          <Logo isOpen={isOpen}>Logo</Logo>
          <Bars>
            <FaBars onClick={toggle} />
          </Bars>
        </TopSection>
        {menuItem.map((item, index) => (
          <Link to={item.path} key={index} activeClassName="active">
            <Icon>{item.icon}</Icon>
            <LinkText isOpen={isOpen}>{item.name}</LinkText>
          </Link>
        ))}
      </SidebarContainer>
      <Main>{children}</Main>
    </Container>
  );
};

export default Sidebar;
