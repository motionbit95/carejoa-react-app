import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CTA = () => {
  return (
    <Section>
      <Wrapper>
        <div style={{ color: "white", fontSize: "13px" }}>
          내 집처럼 편안하고 내가족처럼 밑고 맡길수 있는곳, <br />
          케어조아는 오늘도 우리 부모님이 노후를 편안하게 보내실수 있도록
          노력하겠습니다.
        </div>
        <Title
          level={2}
          style={{
            fontWeight: "900",
            color: "white",
            whiteSpace: "pre-line",
          }}
        >
          요양시설 및 요양서비스 찾기는 케어조아와 함께하세요
        </Title>
        <Link to="/account/login" style={{ width: "100%" }}>
          <StyledCard>무료 상담하기</StyledCard>
        </Link>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  background-color: #3182ce;
  padding: 32px 16px;
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

const StyledCard = styled.div`
  background-color: #ff6347;
  border-radius: 16px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  padding: 16px 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 20px;
  font-weight: 900;
`;

export default CTA;
