import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Image,
} from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Signup = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <Container
      style={{
        position: "relative",
        minHeight: "calc(100vh - 60px)", // 100vh",
      }}
    >
      {step === 1 ? (
        <Step1 setIsChecked={setIsChecked} />
      ) : (
        <Step2 form={form} />
      )}

      <PrimaryButton
        step={step}
        setStep={setStep}
        isChecked={isChecked}
        onFinish={handleSignup}
        style={{
          position: "absolute",

          width: "100%",
        }}
      />
    </Container>
  );
};

const FormInput = ({ name, label, placeholder, rules, type = "text" }) => {
  return (
    <Form.Item
      style={{ margin: "0" }}
      name={name}
      rules={rules}
      label={<div>{label}</div>}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

const Step1 = ({ setIsChecked }) => {
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleCheckChange = (key, checked) => {
    const newCheckedItems = { ...checkedItems, [key]: checked };
    newCheckedItems.all = ["age", "terms", "privacy", "marketing"].every(
      (k) => newCheckedItems[k]
    );
    setCheckedItems(newCheckedItems);
    setIsChecked(
      newCheckedItems.age && newCheckedItems.terms && newCheckedItems.privacy
    );
  };

  return (
    <Section>
      <BodyText>이용약관에 동의해주세요.</BodyText>
      <CheckItem
        label="약관에 모두 동의"
        checked={checkedItems.all}
        onChange={(checked) => handleCheckChange("all", checked)}
        style={{
          backgroundColor: "rgba(241, 241, 241, 0.5)",
          border: "1px solid #d9d9d9",
        }}
      />
      <CheckList checkedItems={checkedItems} onChange={handleCheckChange} />
    </Section>
  );
};

const Step2 = ({ form }) => {
  const [selectedType, setSelectedType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAccountTypeChange = (type) => {
    setSelectedType(type);
    form.resetFields();
    form.setFieldsValue({ type });
  };

  return (
    <FormContainer form={form}>
      <BodyText>회원 유형을 선택해주세요.</BodyText>
      <AccountTypeChoice
        selectedType={selectedType}
        onChange={handleAccountTypeChange}
      />
      <FormInput
        name="name"
        label="이름"
        placeholder="이름을 입력해주세요."
        required
      />
      <FormInput
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        type="email"
        required
      />
      <FormInput
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        required
      />
      <FormInput
        name="confirm_password"
        label="비밀번호 확인"
        placeholder="비밀번호를 확인해주세요."
        type="password"
        required
      />
      <SearchModal open={modalOpen} onCancel={() => setModalOpen(false)} />
    </FormContainer>
  );
};

const CheckItem = ({ label, checked, onChange, style }) => (
  <Checkbox
    style={{
      padding: "12px",
      width: "100%",
      borderRadius: "10px",
      ...style,
    }}
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
  >
    {label}
  </Checkbox>
);

const CheckList = ({ checkedItems, onChange }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <CheckItem
      label="(필수) 만 14세 이상입니다."
      checked={checkedItems.age}
      onChange={(checked) => onChange("age", checked)}
    />
    <CheckWrapper>
      <CheckItem
        label="(필수) 이용약관에 동의합니다."
        checked={checkedItems.terms}
        onChange={(checked) => onChange("terms", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
    <CheckWrapper>
      <CheckItem
        label="(필수) 개인정보 수집 및 이용동의"
        checked={checkedItems.privacy}
        onChange={(checked) => onChange("privacy", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
    <CheckWrapper>
      <CheckItem
        label="(선택) 마케팅 정보 수신 동의"
        checked={checkedItems.marketing}
        onChange={(checked) => onChange("marketing", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
  </div>
);

const AccountTypeChoice = ({ selectedType, onChange }) => (
  <Row gutter={[16, 16]} style={{ width: "100%" }}>
    {["person", "organization"].map((type) => (
      <Col span={12} key={type}>
        <Choice selected={selectedType === type} onClick={() => onChange(type)}>
          <Image
            preview={false}
            src={`/images/signup-${type}.svg`}
            alt={type}
            height={64}
          />
          <div>{type === "person" ? "개인 회원" : "기관 회원"}</div>
        </Choice>
      </Col>
    ))}
  </Row>
);

const SearchModal = ({ open, onCancel }) => (
  <Modal
    open={open}
    onCancel={onCancel}
    centered
    title="기관을 검색해주세요."
    footer={<Button type="primary">확인</Button>}
  >
    <Input
      placeholder="기관명을 입력해주세요."
      size="large"
      prefix={<SearchOutlined />}
    />
    <Table />
  </Modal>
);

const PrimaryButton = ({ step, isChecked, setStep, onFinish }) => (
  <Button
    type="primary"
    size="large"
    block
    onClick={step === 1 ? () => setStep(2) : onFinish}
    disabled={step === 1 && !isChecked}
  >
    {step === 1 ? "동의하기" : "회원가입"}
  </Button>
);

export default Signup;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

const BodyText = styled.div`
  font-size: 14px;
  color: var(--black-alpha-9);
  margin-top: 16px;
`;

const CheckWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-contents: space-between;
`;

const ViewButton = styled.div`
  font-weight: bold;
  text-decoration: underline;
  cusor: pointer;
  color: var(--black-alpha-9);
  white-space: nowrap;
  padding-inline: 16px;
`;
