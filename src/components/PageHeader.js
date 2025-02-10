import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Header } = Layout;

function PageHeader(props) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <ArrowLeftOutlined
        style={{ fontSize: "18px" }}
        onClick={() => navigate(-1)}
      />
      <Title>{props.children}</Title>
      <HomeOutlined
        style={{ fontSize: "18px" }}
        onClick={() => navigate("/")}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--bg-header);
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
`;

export default PageHeader;
