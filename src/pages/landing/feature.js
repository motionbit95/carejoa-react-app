import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { services } from "./data";
import Title from "antd/es/typography/Title";

const Feature = () => {
  return (
    <FeatureSection>
      <Title level={4} style={{ fontWeight: "bold", marginTop: 0 }}>
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
                <service.icon />
              </IconWrapper>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {service.name}
              </div>
            </ServiceItem>
          ))}
        </ServiceContainer>
      </FeatureCard>
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
  margin-top: 48px;
`;

const ServiceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  background-color: white;
  border-radius: 12px;
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
