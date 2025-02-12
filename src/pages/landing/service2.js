import React from "react";
import styled from "styled-components";
import { Row, Col, Image } from "antd";
import Title from "antd/es/typography/Title";

const Service2 = () => (
  <ServiceContainer>
    <Row justify="center" style={{ marginBottom: "40px" }}>
      <Title level={4} style={{ fontWeight: "900" }}>
        케어조아는 이러한 서비스를 제공합니다.
      </Title>
    </Row>

    <Row gutter={[12, 12]}>
      <Col span={12}>
        <ServiceBox bgColor="#0C0228">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TitleText color="white">빠른 상담 서비스</TitleText>
            <StyledText>
              현재 케어조아는 개인, 병원 회원으로 운영되고 있으며, 위치 기반
              가까운 회원과 병원을 매칭해드리고 있어요!
            </StyledText>
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <Image
              src={require("../../assets/landing/map.png")}
              preview={false}
            />
          </div>
        </ServiceBox>
      </Col>

      <Col span={12}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <ServiceBox bgColor="rgb(235, 245, 255)">
              <TitleText>요양시설 추천</TitleText>
              <StyledText>
                지역과 재활 등 특화 영역 뿐 아니라, 등급과 크기 등 중요한 조건에
                맞는 요양시설을 추천해드려요.
              </StyledText>
            </ServiceBox>
          </Col>

          {/* 100% 무료 상담 보장 */}
          <Col span={24}>
            <ServiceBox bgColor="rgb(235, 245, 255)">
              <TitleText>100% 무료 상담 보장</TitleText>
              <StyledText>
                케어조아는 100% 무료 상담을 보장합니다. 상담 신청이 완료되면,
                이후의 모든 프로세스는 센터에게 안심하고 맡겨주세요.
              </StyledText>
            </ServiceBox>
          </Col>
        </Row>
      </Col>
    </Row>
  </ServiceContainer>
);

const ServiceContainer = styled.div`
  padding: 64px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

// 개별 서비스 카드 스타일
const ServiceBox = styled.div`
  background-color: ${(props) => props.bgColor || "#f5f5f5"};
  color: ${(props) => (props.bgColor === "#0C0228" ? "white" : "black")};
  padding: 16px;
  border-radius: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

// 지도 이미지 스타일
const MapContainer = styled.div``;

// 텍스트 스타일
const TitleText = styled.div`
  font-size: 16px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const StyledText = styled.div`
  opacity: 0.6;
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

export default Service2;
