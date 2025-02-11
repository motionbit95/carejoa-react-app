import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CTA = () => {
  const { Text, Title } = Typography;
  return (
    <Section>
      <Wrapper>
        <Text style={{ color: "black", fontSize: "13px" }}>
          내 집처럼 편안하고 내가족처럼 밑고 맡길수 있는곳, <br />
          케어조아는 오늘도 우리 부모님이 노후를 편안하게 보내실수 있도록
          노력하겠습니다.
        </Text>
        <Title
          level={4}
          style={{
            fontWeight: "extrabold",
            color: "black",
            whiteSpace: "pre-line",
          }}
        >
          요양시설 및 요양서비스 찾기는 케어조아와 함께하세요
        </Title>
        <Link to="/login">
          <StyledButton type="primary" size="large">
            무료 상담하기
          </StyledButton>
        </Link>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  background-color: #3182ce;
  padding: 8px 16px;

  @media (min-width: 768px) {
    padding: 12px 24px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const StyledButton = styled(Button)`
  font-weight: bold;
  width: 100%;
  max-width: 200px;
  display: block;
  text-align: center;
`;

export default CTA;
