import { Image, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { reviews } from "./data";

export const Review = (props) => {
  return (
    <Container>
      <Title level={4} style={{ fontWeight: "900", padding: "0px 16px" }}>
        {props.title}
      </Title>
      <ReviewScroll>
        {reviews.map((review, index) => (
          <ReviewList key={index} {...review} />
        ))}
      </ReviewScroll>
    </Container>
  );
};

const ReviewList = ({ name, address, tag, image }) => {
  return (
    <ReviewCard bordered={false}>
      <Column style={{ gap: "12px" }}>
        <Image
          style={{
            backgroundColor: "#D9D9D9",
            width: "120px",
            height: "120px",
            borderRadius: "8px",
          }}
          src={image}
          preview={false}
        />
        <Column style={{ gap: "4px" }}>
          <ReviewName>{name}</ReviewName>
          <ReviewAddress>{address}</ReviewAddress>
          <Space size="small" wrap>
            {tag.map((tag, index) => (
              <TagItem key={index}>{tag}</TagItem>
            ))}
          </Space>
        </Column>
      </Column>
    </ReviewCard>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: 16px 0px;
  background-color: white;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 16px;
  padding-left: 24px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  /* 스크롤바 트랙 배경 설정 */
  &::-webkit-scrollbar-track {
    background: transparent; /* 트랙 배경을 투명하게 설정 */
  }

  /* 스크롤바 핸들 (잡는 부분) 스타일 */
  &::-webkit-scrollbar-thumb {
    background: #888; /* 핸들의 배경색 */
    border-radius: 10px; /* 핸들의 둥근 모서리 */
  }

  /* 스크롤바 핸들을 hover 시 색상 변경 */
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* hover 시 색상 */
  }

  /* 모바일에서는 스크롤바 숨기기 */
  @media (max-width: 767px) {
    &::-webkit-scrollbar {
      display: none; /* 모바일에서 스크롤바 숨기기 */
    }
    -ms-overflow-style: none; /* IE 10+에서 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  }

  /* 768px 이상에서 스크롤바 보이게 하기 */
  @media (min-width: 768px) {
    &::-webkit-scrollbar {
      display: block; /* 768px 이상에서 스크롤바 표시 */
    }
  }
`;

const ReviewCard = styled.div`
  min-width: 150px;
  min-height: 200px;
  padding: 16px 0px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
`;

const TagItem = styled(Tag)`
  font-size: 12px;
  padding: 4px 8px;
  height: auto;
  line-height: 1;
  margin-right: 0px;
  border-radius: 6px;
`;

const ReviewName = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: start;
  line-height: 1.4;
`;

const ReviewAddress = styled.div`
  font-size: 12px;
  text-align: start;
  line-height: 1.4,
  color: #4a5568,
`;
