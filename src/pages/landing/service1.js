import React from "react";
import styled from "styled-components";
import { Image, Row } from "antd";
import Title from "antd/es/typography/Title";

const Service1 = () => (
  <ServiceContainer>
    <ServiceTextContainer>
      <Title level={2} style={{ fontWeight: "bold", whiteSpace: "pre-line" }}>
        {`케어조아는 전국서비스로,
        빠르게 확장하고 있어요.`}
      </Title>
      <div
        style={{
          fontSize: "16px",
          whiteSpace: "normal",
          color: "#4a5568",
          lineHeight: "1.4",
        }}
      >
        {`현재 케어조아는 일반회원과 요양시설 회원을
        전국의 모든 요양시설과 서비스 제공 업체와 상담 시스템을 구축하고 있습니다.`}
      </div>
    </ServiceTextContainer>

    <ImageWrapper>
      <Image
        src={require("../../assets/landing/장기요양.png")}
        preview={false}
      />
    </ImageWrapper>
  </ServiceContainer>
);

const ServiceContainer = styled.div`
  padding: 64px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ButtonGrid = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const ButtonItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  height: 120px;
  border-radius: 12px;
  background-color: ${(props) => props.bgColor || "#f5f5f5"};
  color: white;
  position: relative;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 32px;
`;

export default Service1;
