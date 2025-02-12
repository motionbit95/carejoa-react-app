import React from "react";
import styled from "styled-components";
import { Row, Col, Card } from "antd";
import Title from "antd/es/skeleton/Title";
import { reviews } from "./data";
import Icon from "@ant-design/icons";

const Review = () => {
  return (
    <ReviewContainer>
      <div
        style={{
          textAlign: "start",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            whiteSpace: "pre-line",
            fontWeight: "900",
            lineHeight: "1.2",
          }}
        >{`세상에 없던
            요양 플랫폼 케어조아,`}</div>
        <div
          style={{
            fontSize: "22px",
            whiteSpace: "pre-line",
            fontWeight: "900",
            lineHeight: "1.2",
          }}
        >{`지금 이순간에도 
            빠르게 달려가고 있어요`}</div>
      </div>

      <Row
        gutter={[30, 30]}
        justify="center"
        align="middle"
        style={{ marginTop: 32 }}
      >
        <Col xs={24} md={12}>
          {/* <RatingContainer>
            <Text strong>회원 리뷰 평점</Text>
            <Rating />
            <ScoreText level={2}>4.9점</ScoreText>
          </RatingContainer> */}
        </Col>
        <Col xs={24} md={12}>
          {/* {stats.map((stat, id) => (
            <Stat key={id} {...stat} />
          ))} */}
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
        <div
          style={{
            fontSize: "14px",
            whiteSpace: "normal",
            textAlign: "start",
            color: "#4a5568",
            lineHeight: "1.4",
          }}
        >
          {description}
        </div>
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

const StyledTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
  white-space: pre-line;
`;

const RatingContainer = styled(Card)`
  background: transparent;
  border: none;
  text-align: left;
  color: white;
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

export default Review;
