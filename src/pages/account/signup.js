import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Modal,
  Row,
  Space,
  Table,
  Input,
} from "antd";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Signup(props) {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [ischecked, setIsChecked] = useState(false);

  const handleSignup = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {step === 1 && <Step1 setIsChecked={setIsChecked} />}
      {step === 2 && <Step2 form={form} />}
      <PrimaryButton
        step={step}
        setStep={setStep}
        ischecked={ischecked}
        onFinish={handleSignup}
      />
    </div>
  );
}

const Step1 = (props) => {
  const { setIsChecked } = props;
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    age: false,
    terms: false, // 필수
    privacy: false, // 필수
    marketing: false, // 선택
  });

  // 필수 항목이 모두 체크되었는지 확인하는 함수
  const checkRequired = (newCheckedItems) => {
    const requiredChecked =
      newCheckedItems.age && newCheckedItems.terms && newCheckedItems.privacy;
    setIsChecked(requiredChecked);
  };

  // 개별 체크박스 변경 핸들러
  const handleChange = (key, checked) => {
    const newCheckedItems = { ...checkedItems, [key]: checked };

    // "모두 동의" 체크 여부 확인
    newCheckedItems.all =
      newCheckedItems.age &&
      newCheckedItems.terms &&
      newCheckedItems.privacy &&
      newCheckedItems.marketing;

    setCheckedItems(newCheckedItems);
    checkRequired(newCheckedItems);
  };

  // "모두 동의" 체크박스 클릭 시 모든 체크박스 상태 변경
  const handleAllChange = (checked) => {
    const newCheckedItems = {
      all: checked,
      age: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
    };

    setCheckedItems(newCheckedItems);
    checkRequired(newCheckedItems);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>이용약관에 동의해주세요.</div>

      {/* 모두 동의 체크박스 */}
      <Checkbox
        style={{
          padding: "12px",
          backgroundColor: "gray",
          borderRadius: "10px",
        }}
        checked={checkedItems.all}
        onChange={(e) => handleAllChange(e.target.checked)}
      >
        약관에 모두 동의
      </Checkbox>

      <div
        style={{
          marginLeft: "16px",
          marginRight: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* 필수 체크박스 */}
        <Checkbox
          checked={checkedItems.age}
          onChange={(e) => handleChange("age", e.target.checked)}
        >
          (필수) 만 14세 이상입니다.
        </Checkbox>
        <Space style={{ justifyContent: "space-between" }}>
          <Checkbox
            checked={checkedItems.terms}
            onChange={(e) => handleChange("terms", e.target.checked)}
          >
            (필수) 이용약관에 동의합니다.
          </Checkbox>
          <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
            보기
          </div>
        </Space>
        <Space style={{ justifyContent: "space-between" }}>
          <Checkbox
            checked={checkedItems.privacy}
            onChange={(e) => handleChange("privacy", e.target.checked)}
          >
            (필수) 개인정보 수집 및 이용동의
          </Checkbox>
          <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
            보기
          </div>
        </Space>
        <Space style={{ justifyContent: "space-between" }}>
          {/* 선택 체크박스 */}
          <Checkbox
            checked={checkedItems.marketing}
            onChange={(e) => handleChange("marketing", e.target.checked)}
          >
            (선택) 마케팅 정보 수신 동의
          </Checkbox>
          <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
            보기
          </div>
        </Space>
      </div>
    </div>
  );
};

const Step2 = (props) => {
  const { form } = props;
  const [selectedAccountType, setSelectedAccountType] = useState("");
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
    >
      <Form.Item
        style={{ margin: "0" }}
        name={"type"}
        rules={[{ required: true, message: "이름을 입력해주세요!" }]}
        label={<div>회원 유형을 선택해주세요.</div>}
      >
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={12} style={{ padding: "0 8px" }}>
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
          <Col span={12} style={{ padding: "0 8px" }}>
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
      </Form.Item>
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
          <Flex style={{ gap: "8px" }}>
            <Input
              placeholder="기관명을 입력해주세요."
              type="text"
              size="large"
            />
            <Button size="large" onClick={onSearch}>
              검색
            </Button>
          </Flex>
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
        <Input placeholder="비밀번호를 입력해주세요." size="large" />
      </Form.Item>
      <Form.Item
        style={{ margin: "0" }}
        name={"confirm_password"}
        rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        label={<div>비밀번호 확인</div>}
      >
        <Input placeholder="비밀번호를 확인해주세요." size="large" />
      </Form.Item>

      <SearchModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOK={onOK}
      />
    </Form>
  );
};

const SearchModal = (props) => {
  const { open, onCancel, onOK } = props;

  useEffect(() => {
    if (open) {
      setModalStep(1);
    }
  }, [open]);

  const [modalStep, setModalStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      title={
        modalStep === 1
          ? "기관유형을 선택해주세요."
          : `${
              selectedType === "hospital" ? "요양병원" : "요양원"
            }을 검색해주세요.`
      }
      footer={
        <Space style={{ width: "100%", justifyContent: "center" }}>
          {modalStep === 1 ? (
            <Button size="large" type="primary" onClick={() => setModalStep(2)}>
              기관 검색하기
            </Button>
          ) : (
            <>
              <Button size="large" onClick={onCancel}>
                취소
              </Button>
              <Button size="large" onClick={onOK}>
                확인
              </Button>
            </>
          )}
        </Space>
      }
    >
      {modalStep === 1 ? (
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={12} style={{ padding: "0 8px" }}>
            <Choice
              selected={selectedType === "hospital"}
              onClick={() => setSelectedType("hospital")}
            >
              <Image
                preview={false}
                src="/images/signup3.svg"
                alt="Logo"
                height={64}
              />
              <div>요양병원</div>
            </Choice>
          </Col>
          <Col span={12} style={{ padding: "0 8px" }}>
            <Choice
              selected={selectedType === "care"}
              onClick={() => setSelectedType("care")}
            >
              <Image
                preview={false}
                src="/images/signup4.svg"
                alt="Logo"
                height={64}
              />
              <div>요양원</div>
            </Choice>
          </Col>
        </Row>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Flex style={{ width: "100%", gap: "8px" }}>
            <Input
              placeholder="기관명을 입력해주세요."
              type="text"
              size="large"
            />
            <Button size="large" icon={<SearchOutlined />} />
          </Flex>
          <Table />
        </Space>
      )}
    </Modal>
  );
};

const PrimaryButton = (props) => {
  const { step, ischecked, setStep, onFinish } = props;
  return (
    <>
      {step === 1 && (
        <Button
          disabled={!ischecked}
          onClick={() => setStep(2)}
          type="primary"
          size="large"
        >
          동의하기
        </Button>
      )}
      {step === 2 && (
        <Button type="primary" size="large" onClick={onFinish}>
          회원가입
        </Button>
      )}
    </>
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
  box-sizing: border-box;
  background-color: ${(props) => (props.selected ? "#A1E3F9" : "#F1F1F1")};
  width: 100%;
`;
export default Signup;
