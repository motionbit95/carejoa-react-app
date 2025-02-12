import React from "react";
import { Row, Col, Input, Carousel, Image } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BannerButtons, Banners } from "./data";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <CardContainer>
        <BannerCarousel />
      </CardContainer>

      <CardContainer>
        <StyledCard onClick={() => navigate("/account/login")}>
          <TextTitle>상담 요청 하기</TextTitle>
          <TextDescription>
            희망지역 및 시설 업체의 견적을 받아보실 수 있습니다.
          </TextDescription>
        </StyledCard>
      </CardContainer>

      <CardContainer>
        <GridContainer>
          <Row gutter={[16, 16]} justify="center">
            {BannerButtons.map((button) => (
              <Col span={6} key={button.name}>
                <CardWrapper onClick={() => window.open(button.link)}>
                  <ImageWrapper>{button.icon}</ImageWrapper>
                  <TextWrapper>{button.name}</TextWrapper>
                </CardWrapper>
              </Col>
            ))}
          </Row>
        </GridContainer>
      </CardContainer>

      <EmergencyContainer>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <WhiteButton
              onClick={() => window.open("https://cafe.naver.com/pinkqy5cg")}
            >
              <EmergencyText>{`응급입소 및\n 입원상담`}</EmergencyText>
              <EmergencyDescription>
                {`야간 및 주말, 공휴일 
              응급입소(원)`}
              </EmergencyDescription>
            </WhiteButton>
          </Col>
          <Col span={12}>
            <WhiteButton
              onClick={() => window.open("https://cafe.naver.com/pinkqy5cg")}
            >
              <EmergencyText>{"간병사\n(요양보호사)\n구인구직"}</EmergencyText>
            </WhiteButton>
          </Col>
        </Row>
      </EmergencyContainer>
    </Section>
  );
};

const BannerCarousel = () => {
  return (
    <Carousel autoplay>
      {Banners.map((banner) => (
        <div key={banner.alt}>
          <Image src={banner.image} alt={banner.alt} />
        </div>
      ))}
    </Carousel>
  );
};

const Section = styled.div`
  padding-bottom: 16px;
`;

const CardContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
`;

const StyledCard = styled.div`
  background-color: #ff6347;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  padding: 32px 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const WhiteButton = styled.div`
  background-color: white;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  padding: 8px;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const TextDescription = styled.div`
  font-size: 12px;
  color: white;
`;

const GridContainer = styled.div`
  padding: 16px 0;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 16px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 8px;
`;

const TextWrapper = styled.div`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
`;

const EmergencyContainer = styled.div`
  padding: 32px 16px;
`;

const EmergencyText = styled.div`
  color: #ff6665;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  white-space: pre-line;
  line-height: 1.3;
`;

const EmergencyDescription = styled.div`
  color: #6c6c6c;
  font-size: 12px;
  text-align: center;
  white-space: pre-line;
`;

export default Banner;
