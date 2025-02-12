import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Image, Menu, Row, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LandingHeader = () => {
  // 더미 - 유저
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
    // 적용 필요
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

  // 로그인 되었을 때 메뉴 리스트
  const LoginItem = [
    {
      path: "/mypage",
      label: "마이페이지",
    },
    {
      path: "/counseling",
      label: "상담신청",
    },
    {
      path: "/logout",
      label: "로그아웃",
      onClick: Logout,
    },
  ];

  // 로그인이 안되어 있을 때 메뉴 리스트
  const LogoutItem = [
    {
      path: "/counseling",
      label: "상담신청",
    },
    {
      path: "/account/login",
      label: "로그인",
    },
    {
      path: "/account/signup",
      label: "회원가입",
    },
  ];

  return (
    <>
      <HeaderContainer>
        <Image
          onClick={() => (window.location.href = "/")}
          src={"/images/logo.svg"}
          style={{ height: "32px", cursor: "pointer" }}
          preview={false}
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
        placement="left"
        mask={false}
        onClose={handleOpen}
        closeIcon={false}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Image
              onClick={() => (window.location.href = "/")}
              src={"/images/logo.svg"}
              style={{ height: "32px", cursor: "pointer" }}
              preview={false}
            />
            <CloseOutlined style={{ cursor: "pointer" }} onClick={handleOpen} />
          </div>
        }
        open={open}
        height={"auto"}
        width={"280px"}
        style={{
          zIndex: 9999,
          maxWidth: "280px",
          margin: "0 auto", // 중앙 정렬
        }}
      >
        <Column
          style={{
            gap: "8px",
          }}
        >
          {!user ? (
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
          ) : (
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
          )}
        </Column>
      </Drawer>
    </>
  );
};

const HeaderContainer = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: var(--bg-header);
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--black-alpha-1);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LandingHeader;
