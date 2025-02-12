import { Image, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

export const Review = (props) => {
  const items = [
    {
      id: 1,
      name: "다나움요양병원",
      address: "서울특별시 송파구",
      tag: ["상실", "상실"],
      image: require("../../assets/dummy/advertise.png"),
    },
    {
      id: 2,
      name: "다나움요양병원",
      address: "서울특별시 송파구",
      tag: ["상실", "상실"],
      image: require("../../assets/dummy/advertise.png"),
    },
    {
      id: 3,
      name: "다나움요양병원",
      address: "서울특별시 송파구",
      tag: ["상실", "상실"],
      image: require("../../assets/dummy/advertise.png"),
    },
  ];
  return (
    <Container>
      <Title level={4} style={{ fontWeight: "900", padding: "0px 16px" }}>
        {props.title}
      </Title>
      <ReviewScroll>
        {items.map((review, index) => (
          <ReviewList key={index} {...review} />
        ))}
      </ReviewScroll>
    </Container>
  );
};

const ReviewList = ({ name, address, tag, image }) => {
  return (
    <ReviewCard bordered={false}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Image
          style={{
            backgroundColor: "#D9D9D9",
            width: "120px",
            height: "120px",
            borderRadius: "8px",
          }}
          src={image}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "start",
              lineHeight: "1.4",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "12px",
              whiteSpace: "normal",
              textAlign: "start",
              color: "#4a5568",
              lineHeight: "1.4",
            }}
          >
            {address}
          </div>
          <Space size="small" wrap>
            {tag.map((tag, index) => (
              <TagItem key={index}>{tag}</TagItem>
            ))}
          </Space>
        </div>
      </div>
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

const ReviewScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 16px;
  padding-left: 24px;
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

  @media (min-width: 768px) {
    min-width: 250px;
    min-height: 300px;
    padding: 32px;
  }
`;

const TagItem = styled(Tag)`
  font-size: 10px;
  padding: 2px 6px;
  height: auto;
  line-height: 1;
  margin-right: 0px;
  border-radius: 6px;
`;
