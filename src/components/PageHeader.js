import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const { Header } = Layout;

function PageHeader(props) {
  return (
    <HeaderContainer>
      <ArrowLeftOutlined style={{ fontSize: "18px" }} />
      <Title>{props.children}</Title>
      <HomeOutlined style={{ fontSize: "18px" }} />
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
