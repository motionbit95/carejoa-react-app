import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  Image,
  Input,
  List,
  Modal,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";

// 시설 검색 모달 컴포넌트
const SearchModal = ({ open, onCancel, onOK }) => {
  const [modalStep, setModalStep] = useState(1); // 모달 단계
  const [selectedType, setSelectedType] = useState(""); // 선택된 기관 유형
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  const facilities = [
    {
      id: 1,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    // 다른 시설 데이터 추가...
  ];

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (open) {
      setModalStep(1);
    }
  }, [open]);

  // 검색 함수
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      title={getModalTitle(modalStep, selectedType)}
      footer={getModalFooter(modalStep, onCancel, onOK, setModalStep)}
      style={{ height: "500px" }}
      bodyStyle={{ height: "400px", overflowY: "auto" }}
    >
      {modalStep === 1 ? (
        <Step1 selectedType={selectedType} setSelectedType={setSelectedType} />
      ) : modalStep === 2 ? (
        <Step2
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          facilities={facilities}
          setModalStep={setModalStep}
        />
      ) : (
        <Step3 />
      )}
    </Modal>
  );
};

// 모달 타이틀
const getModalTitle = (modalStep, selectedType) => {
  if (modalStep === 1) return "기관유형을 선택해주세요.";
  return selectedType === "hospital" ? "요양병원 검색" : "요양원 검색";
};

// 모달 하단 버튼
const getModalFooter = (modalStep, onCancel, onOK, setModalStep) => {
  if (modalStep === 1) {
    return (
      <Button
        size="large"
        type="primary"
        onClick={() => setModalStep(2)}
        style={{ width: "100%" }}
      >
        기관 검색하기
      </Button>
    );
  }
  return (
    <div style={{ display: "flex", gap: "8px", width: "100%" }}>
      <Button size="large" onClick={onCancel} style={{ flex: 1 }}>
        취소
      </Button>
      <Button size="large" type="primary" onClick={onOK} style={{ flex: 1 }}>
        확인
      </Button>
    </div>
  );
};

// Step1: 기관 유형 선택
const Step1 = ({ selectedType, setSelectedType }) => (
  <Row gutter={[16, 16]} style={{ width: "100%" }}>
    {["hospital", "care"].map((type) => (
      <Col key={type} span={12} style={{ padding: "0 8px", display: "flex" }}>
        <Choice
          selected={selectedType === type}
          onClick={() => setSelectedType(type)}
        >
          <Image
            preview={false}
            src={`/images/signup${type === "hospital" ? "3" : "4"}.svg`}
            alt="Logo"
            height={64}
          />
          <div>{type === "hospital" ? "요양병원" : "요양원"}</div>
        </Choice>
      </Col>
    ))}
  </Row>
);

// Step2: 기관 검색
const Step2 = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  facilities,
  setModalStep,
}) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <div style={{ display: "flex", gap: "8px", width: "100%" }}>
      <Input
        placeholder="기관명을 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="large"
      />
      <Button size="large" icon={<SearchOutlined />} onClick={handleSearch} />
    </div>
    <List
      split={false}
      dataSource={[]}
      renderItem={renderFacility}
      pagination={{ pageSize: 3, hideOnSinglePage: true, align: "center" }}
      locale={{ emptyText: renderEmptyState({ setModalStep }) }}
    />
  </Space>
);

// Step3: 기관 등록
const Step3 = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <Input placeholder="기관명을 입력해주세요." size="large" />
    <Input placeholder="기관 주소를 입력해주세요." size="large" />
    <Input placeholder="기관 전화번호를 입력해주세요." size="large" />
  </div>
);

// 검색 결과가 없을 때
const renderEmptyState = ({ setModalStep }) => (
  <Space
    direction="vertical"
    style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
  >
    <Empty description="검색 결과가 없습니다." />
    <Button type="primary" size="large" onClick={() => setModalStep(3)}>
      직접 등록하기
    </Button>
  </Space>
);

// 시설 목록 항목
const renderFacility = (facility) => (
  <List.Item style={{ cursor: "pointer", padding: "8px 0" }}>
    <ListWrapper title={facility.name} description={facility.address} />
  </List.Item>
);

// 스타일링 컴포넌트
const Choice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 10px;
  padding: 12px 24px;
  background-color: ${(props) => (props.selected ? "#A1E3F9" : "#F1F1F1")};
  width: 100%;
  cursor: pointer;
`;

const ListWrapper = styled(List.Item.Meta)`
  padding: 16px;
  border-radius: 10px;
  background-color: #f5f5f5;

  &:hover {
    background-color: var(--selected-color);
  }
`;

export default SearchModal;
