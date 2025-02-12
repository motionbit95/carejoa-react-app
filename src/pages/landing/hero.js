import { Button, Image, Flex, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Space direction="vertical" size={36}>
        <div>
          <Title
            level={4}
            style={{ fontWeight: "extrabold", lineHeight: "1.2" }}
          >
            여기저기 요양시설 찾아보느라 힘드셨죠?
          </Title>
          <div>케어조아는 상담지만 작성하면 끄~읏</div>
        </div>

        <Flex
          style={{ justifyContent: "center", alignItems: "center", gap: 8 }}
        >
          <div style={{ textAlign: "center" }}>
            <Title level={4}>간단한 상담지 작성</Title>
            <div style={{ fontSize: "12px" }}>
              고객 정보를 작성하고 상담을 신청합니다.
            </div>
          </div>
          <ImageContainer>
            <Image
              preview={false}
              src={require("../../assets/landing/touch-screen.png")}
            />
          </ImageContainer>
        </Flex>
        <Flex
          style={{ justifyContent: "center", alignItems: "center", gap: 8 }}
        >
          <ImageContainer>
            <Image
              preview={false}
              src={require("../../assets/landing/mentorship.png")}
            />
          </ImageContainer>

          <div>
            <Title level={4}>상담 견적서 도착</Title>
            <div style={{ fontSize: "12px" }}>
              내가 희망하는 지역의 요양시설에서 <br />
              시설 정보와 간단한 견적을 받아보실 수 있습니다.
            </div>
          </div>
        </Flex>
        {/* 상담하기 버튼 */}
        <div style={{ width: "100%" }}>
          <StyledButton
            type="primary"
            size="large"
            onClick={() => navigate("/account/login")}
          >
            무료 상담하기
          </StyledButton>
        </div>
      </Space>
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
  background-color: #ff6347;
  border-radius: 16px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  padding: 32px 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
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
