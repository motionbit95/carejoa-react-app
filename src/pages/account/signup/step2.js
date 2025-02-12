import { Button, Col, Form, Image, Input, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import SearchModal from "./modal";

const Step2 = (props) => {
  const { form } = props;
  const [selectedAccountType, setSelectedAccountType] = useState("person");
  const [modalOpen, setModalOpen] = useState(false);

  const onSearch = () => {
    setModalOpen(true);
  };

  const onOK = () => {
    setModalOpen(false);
  };

  const handleAccountTypeChange = (type) => {
    setSelectedAccountType(type);
    form.setFieldsValue({
      type,
      name: null,
      organization_name: null,
      email: null,
      password: null,
      confirm_password: null,
    });
  };

  return (
    <Form
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      form={form}
      requiredMark={false}
      layout="vertical"
    >
      <div>회원 유형을 선택해주세요.</div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Choice
            selected={selectedAccountType === "person"}
            onClick={() => handleAccountTypeChange("person")}
          >
            <Image
              preview={false}
              src="/images/signup1.svg"
              alt="Logo"
              height={64}
            />
            <div>개인 회원</div>
          </Choice>
        </Col>
        <Col span={12}>
          <Choice
            selected={selectedAccountType === "organization"}
            onClick={() => handleAccountTypeChange("organization")}
          >
            <Image
              preview={false}
              src="/images/signup2.svg"
              alt="Logo"
              height={64}
            />
            <div>기관 회원</div>
          </Choice>
        </Col>
      </Row>

      {selectedAccountType === "person" ? (
        <Form.Item
          style={{ margin: "0" }}
          name={"name"}
          rules={[{ required: true, message: "이름을 입력해주세요!" }]}
          label={<div>이름</div>}
        >
          <Input placeholder="이름을 입력해주세요." type="text" size="large" />
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: "0" }}
          name={"organization_name"}
          rules={[{ required: true, message: "기관명을 입력해주세요!" }]}
          label={<div>기관명</div>}
        >
          <AnswerContainer>
            <Input
              placeholder="기관명을 입력해주세요."
              type="text"
              size="large"
            />
            <Button size="large" onClick={onSearch}>
              검색
            </Button>
          </AnswerContainer>
        </Form.Item>
      )}

      <Form.Item
        style={{ margin: "0" }}
        name={"email"}
        rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
        label={<div>이메일</div>}
      >
        <Input placeholder="이메일을 입력해주세요." type="email" size="large" />
      </Form.Item>
      <Form.Item
        style={{ margin: "0" }}
        name={"password"}
        rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        label={<div>비밀번호</div>}
      >
        <Input.Password placeholder="비밀번호를 입력해주세요." size="large" />
      </Form.Item>
      <Form.Item
        style={{ margin: "0" }}
        name={"confirm_password"}
        rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        label={<div>비밀번호 확인</div>}
      >
        <Input.Password placeholder="비밀번호를 확인해주세요." size="large" />
      </Form.Item>

      <SearchModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOK={onOK}
      />
    </Form>
  );
};

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

const AnswerContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default Step2;
