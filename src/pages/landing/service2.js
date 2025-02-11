import React from "react";
import styled from "styled-components";
import { Row, Col, Typography, Image } from "antd";
import Title from "antd/es/skeleton/Title";

const Service2 = () => (
  <ServiceContainer>
    <Row justify="center" style={{ marginBottom: "40px" }}>
      <Title level={3} style={{ fontWeight: "bold" }}>
        케어조아는 이러한 서비스를 제공합니다.
      </Title>
    </Row>

    <Row gutter={[24, 24]}>
      {/* 빠른 상담 서비스 */}
      <Col xs={24} sm={12}>
        <ServiceBox bgColor="#0C0228">
          <Title level={3} style={{ fontSize: "24px", fontWeight: "bold" }}>
            빠른 상담 서비스
          </Title>
          <StyledText>
            현재 케어조아는 개인, 병원 회원으로 운영되고 있으며, 위치 기반
            가까운 회원과 병원을 매칭해드리고 있어요!
          </StyledText>
          <MapContainer>
            {/* <Image src={mapImage} preview={false} /> */}
            {/* <Image className="example" src={exampleImage} preview={false} /> */}
          </MapContainer>
        </ServiceBox>
      </Col>

      <Col xs={24} sm={12}>
        <Row gutter={[24, 24]}>
          {/* 요양시설 추천 */}
          <Col span={24}>
            <ServiceBox bgColor="rgb(235, 245, 255)">
              <Title level={3} style={{ fontSize: "24px", fontWeight: "bold" }}>
                요양시설 추천
              </Title>
              <StyledText>
                지역과 재활 등 특화 영역 뿐 아니라, 등급과 크기 등 중요한 조건에
                맞는 요양시설을 추천해드려요.
              </StyledText>
            </ServiceBox>
          </Col>

          {/* 100% 무료 상담 보장 */}
          <Col span={24}>
            <ServiceBox bgColor="rgb(235, 245, 255)">
              <Title level={3} style={{ fontSize: "24px", fontWeight: "bold" }}>
                100% 무료 상담 보장
              </Title>
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
  padding: 24px;
  border-radius: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 지도 이미지 스타일
const MapContainer = styled.div`
  position: relative;
  padding: 32px 0;
  display: flex;
  align-items: center;

  img {
    width: 66%;
  }

  .example {
    width: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

// 텍스트 스타일
const StyledText = styled.div`
  opacity: 0.6;
  font-size: 14px;
`;

export default Service2;
