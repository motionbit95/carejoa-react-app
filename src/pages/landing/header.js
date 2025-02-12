import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Image, Menu, Row, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LandingHeader = () => {
  const user = {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    password: "1q2w3e4r!",
    phone: "010-1234-5678",
    gender: "male",
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const Logout = () => {
    console.log("로그아웃");
  };

  const handleMenuClick = (path, onClick) => {
    if (onClick) {
      onClick(); // 클릭된 항목에 onClick 함수가 있으면 실행
    } else {
      navigate(path); // onClick 함수가 없으면 해당 경로로 이동
    }
    setOpen(false); // 메뉴를 닫음
  };

  const LoginItem = [
    {
      path: "/mypage",
      label: "마이페이지",
      // icon: <MailOutlined />,
    },
    {
      path: "/counseling",
      label: "상담신청",
      // icon: < />
    },
    {
      path: "/logout",
      label: "로그아웃",
      onClick: Logout,
    },
  ];

  const LogoutItem = [
    {
      path: "/counseling",
      label: "상담신청",
      // icon: < />
    },
    {
      path: "/account/login",
      label: "로그인",
      // icon: < />
    },
    {
      path: "/account/signup",
      label: "회원가입",
      // icon: < />
    },
  ];

  return (
    <>
      <HeaderContainer>
        <Image
          onClick={() => (window.location.href = "/")}
          src={"/images/logo.svg"}
          style={{ height: "32px", cursor: "pointer" }}
        />
        <Space style={{ alignItems: "center" }}>
          <Button
            size="large"
            type="text"
            icon={<FiSearch />}
            onClick={() => navigate("/search")}
          />
          <Button
            size="large"
            type="text"
            icon={open ? <CloseOutlined /> : <MenuOutlined />}
            onClick={handleOpen}
            aria-label="Toggle Menu"
          />
        </Space>
      </HeaderContainer>
      <Drawer
        placement="top"
        mask={false}
        onClose={handleOpen}
        closeIcon={null}
        open={open}
        width={250}
        height={"auto"}
        style={{ paddingTop: "64px" }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {!user ? (
            <Menu
              mode="vertical"
              onClick={({ key }) =>
                handleMenuClick(LoginItem[key].path, LoginItem[key].onClick)
              }
            >
              {LoginItem.map((item, index) => (
                <Menu.Item key={index} icon={item.icon}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          ) : (
            <Menu
              mode="vertical"
              onClick={({ key }) =>
                handleMenuClick(LogoutItem[key].path, LogoutItem[key].onClick)
              }
            >
              {LogoutItem.map((item, index) => (
                <Menu.Item key={index} icon={item.icon}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          )}
        </div>
      </Drawer>
    </>
  );
};

const HeaderContainer = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: var(--bg-header);
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--black-alpha-1);
`;

export default LandingHeader;
