import React from "react";
import styled from "styled-components";
import { Row, Col, Rate, Space } from "antd";
import { reviews } from "./data";
import Icon from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const Review = () => {
  return (
    <ReviewContainer>
      <StyledTitleBox style={{}}>
        <StyledTitleFont>{`세상에 없던
            요양 플랫폼 케어조아,`}</StyledTitleFont>
        <StyledTitleFont>{`지금 이순간에도 
            빠르게 달려가고 있어요`}</StyledTitleFont>
      </StyledTitleBox>

      <Row
        gutter={[30, 30]}
        justify="center"
        align="middle"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <Col xs={24} md={12}>
          <RatingContainer>
            <RatingFont>회원 리뷰 평점</RatingFont>
            <CustomRate value={5} />
            <Title
              level={1}
              style={{ color: "#42d950", fontWeight: "900", margin: "6px 0" }}
            >
              4.9점
            </Title>
          </RatingContainer>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <RatingContainer>
              <RatingFont>누적 회원가입수</RatingFont>
              <Title
                level={2}
                style={{
                  color: "#42d950",
                  fontWeight: "900",
                  margin: "6px 0",
                }}
              >
                400,000명+
              </Title>
            </RatingContainer>
            <RatingContainer>
              <RatingFont>누적 상담건수</RatingFont>
              <Title
                level={2}
                style={{ color: "#42d950", fontWeight: "900", margin: "6px 0" }}
              >
                801,001건
              </Title>
            </RatingContainer>
          </div>
        </Col>
      </Row>

      <ReviewScroll>
        {reviews.map((review, index) => (
          <ReviewList key={index} {...review} />
        ))}
      </ReviewScroll>
    </ReviewContainer>
  );
};

const ReviewList = ({ name, description, icon }) => {
  return (
    <ReviewCard bordered={false}>
      <IconContainer>
        <Icon component={icon} />
      </IconContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{ textAlign: "start", fontWeight: "bold", fontSize: "18px" }}
        >
          {name}
        </div>
        <ReviewFont>{description}</ReviewFont>
      </div>
    </ReviewCard>
  );
};

const ReviewContainer = styled.div`
  background: black;
  padding: 64px 24px;
  color: white;
  text-align: center;
`;
const StyledTitleBox = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 20px;
  white-space: pre-line;

  @media (min-width: 768px) {
    text-align: center;
    white-space: normal;
  }
`;

const StyledTitleFont = styled.div`
  font-size: 22px;
  font-weight: 900;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const RatingContainer = styled.div`
  background: transparent;
  border: none;
  text-align: left;
  color: white;
`;

const RatingFont = styled.div`
  color: #4a5568;
  font-size: 12px;
  margin-bottom: 6px;
`;

const CustomRate = styled(Rate)`
  .ant-rate-star {
    color: #42d950;
  }
`;

const ScoreText = styled.div`
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(to right, #49e697, #42d950);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ReviewScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 16px;
`;

const ReviewCard = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: #f5f5f5;
  padding: 24px;
  border-radius: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    min-width: 250px;
    min-height: 300px;
    padding: 32px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 12px;
  font-size: 24px;
  color: #1890ff;

  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
    font-size: 32px;
  }
`;

const ReviewFont = styled.div`
  font-size: 14px;
  color: #4a5568;
  white-space: normal;
  text-align: start;
  line-height: 1.4;
`;

export default Review;
