import React from "react";
import styled from "styled-components";
import { Typography, Row, Col, Card } from "antd";
import Title from "antd/es/skeleton/Title";
// import { Stat } from "./Stat";
// import { reviews, stats } from "./data";
// import { Rating } from "./Rating";
// import { ReviewList } from "./ReviewList";

const Review = () => {
  const reviews = [
    {
      name: "요양병원",
      description:
        "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
      //   icon: MdLocalHospital,
    },
    {
      name: "요양원",
      description:
        "할머니를 병원에 모시면서 그동안 신경 써주신 의사선생님 간호사님들 요양보호사분 너무 감사합니다 다들 너무 친절하시고 좋았습니다.",
      //   icon: MdHealing,
    },
    {
      name: "요양원",
      description:
        "할머니를 병원에 모시면서 그동안 신경 써주신 의사선생님 간호사님들 요양보호사분 너무 감사합니다 다들 너무 친절하시고 좋았습니다.",
      //   icon: MdHealing,
    },
    {
      name: "요양병원",
      description:
        "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
      //   icon: MdLocalHospital,
    },
    {
      name: "요양병원",
      description:
        "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
      //   icon: MdLocalHospital,
    },
    {
      name: "요양병원",
      description:
        "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
      //   icon: MdLocalHospital,
    },
    {
      name: "요양병원",
      description:
        "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
      //   icon: MdLocalHospital,
    },
  ];
  return (
    <ReviewContainer>
      <Row justify="center">
        <Col xs={24} md={16}>
          <StyledTitle level={2}>
            세상에 없던{"\n"}요양 플랫폼 케어조아,
          </StyledTitle>
          <StyledTitle level={2}>
            지금 이순간에도 빠르게 달려가고 있어요
          </StyledTitle>
        </Col>
      </Row>

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
      <IconContainer>{icon}</IconContainer>
      <div>
        <Title level={4} style={{ textAlign: "start", fontWeight: "bold" }}>
          {name}
        </Title>
        <div
          type="secondary"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6,
            overflow: "hidden",
            textAlign: "start",
            fontSize: "14px",
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

const ReviewCard = styled(Card)`
  min-width: 200px;
  min-height: 200px;
  background-color: #f5f5f5;
  padding: 24px;
  border-radius: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;

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
  width: 48px;
  height: 48px;
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
