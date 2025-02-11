import { Button, Typography, Image, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Text, Title } = Typography;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Row justify="center" gutter={[16, 32]}>
        <Col span={24}>
          <Title
            level={2}
            style={{ fontWeight: "extrabold", lineHeight: "1.2" }}
          >
            여기저기 요양시설 찾아보느라 힘드셨죠?
          </Title>
          <Text type="secondary">케어조아는 상담지만 작성하면 끄~읏</Text>
        </Col>

        {/* Step 1 */}
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <Title level={4}>간단한 상담지 작성</Title>
          <Text>고객 정보를 작성하고 상담을 신청합니다.</Text>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <ImageContainer>
            <Image
              preview={false}
              //   src={require("../../asset/touch-screen.png")}
            />
          </ImageContainer>
        </Col>

        {/* Step 2 */}
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <ImageContainer>
            <Image
              preview={false}
              //   src={require("../../asset/mentorship.png")}
            />
          </ImageContainer>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <Title level={4}>상담 견적서 도착</Title>
          <Text>
            내가 희망하는 지역의 요양시설에서 <br />
            시설 정보와 간단한 견적을 받아보실 수 있습니다.
          </Text>
        </Col>

        {/* 상담하기 버튼 */}
        <Col span={24} style={{ textAlign: "center" }}>
          <StyledButton
            type="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            무료 상담하기
          </StyledButton>
        </Col>
      </Row>
    </Section>
  );
};

const Section = styled.div`
  padding: 64px 16px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 96px 24px;
  }
`;

const StyledButton = styled(Button)`
  font-weight: bold;
  width: 100%;
  max-width: 200px;
  display: block;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export default Hero;
