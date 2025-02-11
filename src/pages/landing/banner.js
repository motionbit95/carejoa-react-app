import React from "react";
import { Button, Row, Col, Card, Typography, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <DesktopContainer>
        <SearchWrapper onClick={() => navigate("/search")}>
          {/* <SearchBar /> */}
        </SearchWrapper>
      </DesktopContainer>

      <BannerCarousel />

      <CardContainer>
        <StyledCard onClick={() => navigate("/login")}>
          <TextTitle>상담 요청 하기</TextTitle>
          <TextDescription>
            희망지역 및 시설 업체의 견적을 받아보실 수 있습니다.
          </TextDescription>
        </StyledCard>
      </CardContainer>

      <GridContainer>
        <Row gutter={[16, 16]} justify="center">
          {BannerButtons.map((button) => (
            <Col xs={8} sm={6} md={4} key={button.name}>
              <CardWrapper onClick={() => window.open(button.link)}>
                <ImageWrapper>{button.icon}</ImageWrapper>
                <TextWrapper>{button.name}</TextWrapper>
              </CardWrapper>
            </Col>
          ))}
        </Row>
      </GridContainer>

      <EmergencyContainer>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <StyledCard
              onClick={() => window.open("https://cafe.naver.com/pinkqy5cg")}
              bgColor="#FF6665"
            >
              <EmergencyText>응급입소 및 입원상담</EmergencyText>
              <EmergencyDescription>
                야간 및 주말, 공휴일 응급입소(원)
              </EmergencyDescription>
            </StyledCard>
          </Col>
          <Col xs={24} sm={12}>
            <StyledCard
              onClick={() => window.open("https://cafe.naver.com/pinkqy5cg")}
              bgColor="#FF6665"
            >
              <EmergencyText>간병사(요양보호사) 구인구직</EmergencyText>
            </StyledCard>
          </Col>
        </Row>
      </EmergencyContainer>
    </Section>
  );
};

const Section = styled.div`
  background-color: #f5f5f5;
  padding-bottom: 16px;
`;

const DesktopContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    padding: 32px 0;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  cursor: pointer;
`;

const BannerCarousel = styled.div`
  /* You can replace this with your actual carousel component */
`;

const CardContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
`;

const StyledCard = styled(Card)`
  background-color: #bee3f8;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #a2dbfc;
  }
`;

const TextTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const TextDescription = styled.div`
  font-size: 12px;
`;

const GridContainer = styled.div`
  padding: 16px 0;
`;

const CardWrapper = styled(Card)`
  cursor: pointer;
  text-align: center;
`;

const ImageWrapper = styled.div`
  margin-bottom: 8px;
`;

const TextWrapper = styled.div`
  font-size: 14px;
  color: #666;
`;

const EmergencyContainer = styled.div`
  padding: 32px 16px;
`;

const EmergencyText = styled.div`
  color: #ff6665;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const EmergencyDescription = styled.div`
  color: #6c6c6c;
  font-size: 12px;
  text-align: center;
`;

export const BannerButtons = [
  {
    name: "지도검색",
    icon: <Image src={require("../../assets/Icon/icon1.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "지역검색",
    icon: <Image src={require("../../assets/Icon/icon2.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "제휴시설",
    icon: <Image src={require("../../assets/Icon/icon3.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "요양원",
    icon: <Image src={require("../../assets/Icon/icon4.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "요양병원",
    icon: <Image src={require("../../assets/Icon/icon5.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "주야간보호",
    icon: <Image src={require("../../assets/Icon/icon6.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "실버타운",
    icon: <Image src={require("../../assets/Icon/icon7.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문요양",
    icon: <Image src={require("../../assets/Icon/icon8.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문목욕",
    icon: <Image src={require("../../assets/Icon/icon9.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "양로원",
    icon: <Image src={require("../../assets/Icon/icon10.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문간호",
    icon: <Image src={require("../../assets/Icon/icon11.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "단기보호",
    icon: <Image src={require("../../assets/Icon/icon12.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
];
export default Banner;
