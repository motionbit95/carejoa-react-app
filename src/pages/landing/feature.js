import React from "react";
import styled from "styled-components";
import { Row, Col, Typography } from "antd";
import Title from "antd/es/skeleton/Title";

const Feature = () => {
  const services = [
    {
      name: "요양병원",
      description: "병원수준의 의료 서비스 제공",
      //   icon: MdLocalHospital,
      color: "#40CF69",
      bgcolor: "rgba(64, 207, 105, 0.2)",
    },
    {
      name: "요양원",
      description: "일상적인 돌봄과 지원",
      //   icon: MdHealing,
      color: "#3B6EFF",
      bgcolor: "rgba(59, 110, 255, 0.2)",
    },
    {
      name: "주야간보호",
      description: "일상적인 돌봄 서비스 제공",
      //   icon: MdHealthAndSafety,
      color: "#FE6D6A",
      bgcolor: "rgba(254, 109, 106, 0.2)",
    },
    {
      name: "실버타운",
      description: "일시적인 돌봄 제공",
      //   icon: MdLocalHotel,
      color: "#FFC001",
      bgcolor: "rgba(255, 192, 1, 0.2)",
    },
  ];

  return (
    <FeatureSection>
      <Title level={2} style={{ fontWeight: "bold" }}>
        어디로 모셔야 할까요?
      </Title>
      <div style={{ fontSize: "16px", whiteSpace: "pre-line" }}>
        {`내 집처럼 편안한 곳, 
        내 가족처럼 믿을 수 있는 곳, 
        케어조아에서 찾아보세요.`}
      </div>

      <FeatureCard>
        <ServiceContainer>
          {services.map((service) => (
            <ServiceItem key={service.name}>
              <IconWrapper bg={service.bgcolor} color={service.color}>
                {service.icon}
              </IconWrapper>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {service.name}
              </div>
            </ServiceItem>
          ))}
        </ServiceContainer>
      </FeatureCard>

      <Row gutter={[20, 20]} style={{ marginTop: "32px" }} justify="center">
        {services.map((service) => (
          <Col key={service.name} xs={24} sm={12} md={6}>
            <ServiceItem
              onClick={() => window.open("https://cafe.naver.com/pinkqy5cg")}
            >
              <IconWrapper bg="#f5f5f5">{service.icon}</IconWrapper>
              <Title level={4} style={{ fontWeight: "500" }}>
                {service.name}
              </Title>
              <div>{service.description}</div>
            </ServiceItem>
          </Col>
        ))}
      </Row>
    </FeatureSection>
  );
};

const FeatureSection = styled.div`
  padding: 64px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background: linear-gradient(to right, #ffe875, #ffd24f);
  border-radius: 12px;
`;

const ServiceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  gap: 20px;
`;

const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  text-align: center;

  @media (min-width: 768px) {
    width: 100px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(props) => props.bg || "#f5f5f5"};

  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
  }

  svg {
    font-size: 24px;
    color: ${(props) => props.color || "#000"};

    @media (min-width: 768px) {
      font-size: 32px;
    }
  }
`;

export default Feature;
