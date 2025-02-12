import { Image, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

export const Cards = (props) => {
  return (
    <Container>
      <Title level={4} style={{ fontWeight: "900" }}>
        {props.title}
      </Title>
      <Hospitals />
    </Container>
  );
};

const Hospitals = () => {
  const TagList = [
    {
      id: 1,
      name: "다나움요양병원",
      address: "서울특별시 송파구 가락로 278, 지하1층 ~ 지상6층(방이동)",
      grade: "1등급",
      size: "소형",
      establishment_date: "설립3년",
      program: "물리치료",
      shelter_grade: "상급병실",
    },
    {
      id: 2,
      name: "다나움요양병원",
      address: "서울특별시 송파구 가락로 278, 지하1층 ~ 지상6층(방이동)",
      grade: "1등급",
      size: "소형",
      establishment_date: "설립3년",
      program: "물리치료",
      shelter_grade: "상급병실",
    },
    {
      id: 3,
      name: "다나움요양병원",
      address: "서울특별시 송파구 가락로 278, 지하1층 ~ 지상6층(방이동)",
      grade: "1등급",
      size: "소형",
      establishment_date: "설립3년",
      program: "물리치료",
      shelter_grade: "상급병실",
    },
  ];
  return (
    <>
      {TagList.map((hospital) => (
        <HospitalCard>
          <ImageContainer>
            <Image
              width={80}
              height={80}
              style={{ borderRadius: "8px", backgroundColor: "#d9d9d9" }}
            />
            <StarIcon>
              <FaStar color="#FD8606" />
            </StarIcon>
          </ImageContainer>
          <HospitalInfo>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {hospital.name}
            </div>
            <div style={{ fontSize: "12px" }}>{hospital.address}</div>

            <TagContainer>
              <Space size="small" wrap>
                <TagItem color="blue">{hospital.grade}</TagItem>
                <TagItem>{hospital.size}</TagItem>
                <TagItem>{hospital.establishment_date}</TagItem>
                <TagItem>{hospital.program}</TagItem>
                <TagItem>{hospital.shelter_grade}</TagItem>
              </Space>
            </TagContainer>
          </HospitalInfo>
        </HospitalCard>
      ))}
    </>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 16px;
  background-color: white;
`;

const HospitalCard = styled.div`
  display: flex;
  background-color: white;
  padding: 12px 6px;
  border-radius: 8px;
  gap: 12px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const StarIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const HospitalInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TagContainer = styled.div`
  padding-top: 4px;
`;

const TagItem = styled(Tag)`
  font-size: 10px;
  padding: 2px 6px;
  height: auto;
  line-height: 1;
  margin-right: 0px;
  border-radius: 6px;
`;
