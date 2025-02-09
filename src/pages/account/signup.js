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
  List,
  Empty,
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
    let newCheckedItems = { ...checkedItems, [key]: checked };

    if (key === "all") {
      // "약관에 모두 동의"가 선택되면 나머지 체크박스도 모두 선택
      newCheckedItems = {
        all: checked,
        age: checked,
        terms: checked,
        privacy: checked,
        marketing: checked, // 선택 항목도 포함
      };
    } else {
      // 개별 체크 변경 시 "all" 상태 업데이트
      newCheckedItems.all = ["age", "terms", "privacy", "marketing"].every(
        (k) => newCheckedItems[k]
      );
    }

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
        onChange={(checked) => {
          handleCheckChange("all", checked);
        }}
        style={{
          backgroundColor: "rgba(241, 241, 241, 0.5)",
          border: "1px solid #d9d9d9",
        }}
      />
      <CheckList checkedItems={checkedItems} onChange={handleCheckChange} />
    </Section>
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
      layout="vertical"
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
          <div style={{ gap: "8px", display: "flex" }}>
            <Input
              placeholder="기관명을 입력해주세요."
              type="text"
              size="large"
            />
            <Button size="large" onClick={onSearch}>
              검색
            </Button>
          </div>
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

const SearchModal = (props) => {
  const { open, onCancel, onOK } = props;

  const facilities = [
    {
      id: 1,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 2,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 3,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 4,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 5,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 6,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
    {
      id: 7,
      name: "한마음 요양병원",
      address: "서울시 행복구 행복동 행복로 123-56",
      tel: "02-1234-5678",
    },
  ];

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
        <div style={{ fontWeight: "bold", marginBottom: "24px" }}>
          {modalStep === 1
            ? "기관유형을 선택해주세요."
            : modalStep === 2
            ? `${
                selectedType === "hospital" ? "요양병원" : "요양원"
              }을 검색해주세요.`
            : "직접 등록하기"}
        </div>
      }
      footer={
        <div
          style={{
            display: "flex",
            flexDirection: "column", // 버튼을 세로로 배치
            gap: "8px", // 버튼 간 간격 조정
            width: "100%", // 전체 너비
          }}
        >
          {modalStep === 1 ? (
            <Button
              size="large"
              type="primary"
              onClick={() => setModalStep(2)}
              style={{ width: "100%", fontWeight: "bold" }}
            >
              기관 검색하기
            </Button>
          ) : (
            <div style={{ display: "flex", width: "100%", gap: "8px" }}>
              <Button size="large" onClick={onCancel} style={{ flex: 1 }}>
                취소
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={onOK}
                style={{ flex: 1 }}
              >
                확인
              </Button>
            </div>
          )}
        </div>
      }
      style={{ height: "500px" }} // 모달 자체의 높이 설정
      bodyStyle={{ height: "400px", overflowY: "auto" }} // 내용 영역 조절
    >
      {modalStep === 1 ? (
        <Row
          gutter={[16, 16]}
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <Col
            span={12}
            style={{
              padding: "0 8px",
              display: "flex",
            }}
          >
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
          <Col span={12} style={{ padding: "0 8px", display: "flex" }}>
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
      ) : modalStep === 2 ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ display: "flex", width: "100%", gap: "8px" }}>
            <Input
              placeholder="기관명을 입력해주세요."
              type="text"
              size="large"
            />
            <Button size="large" icon={<SearchOutlined />} />
          </div>
          <List
            split={false}
            dataSource={facilities}
            renderItem={renderFacility}
            pagination={{
              pageSize: 3,
              hideOnSinglePage: true,
              align: "center",
            }}
            locale={{
              emptyText: (
                <Space
                  direction="vertical"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    height: "280px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Empty description="검색 결과가 없습니다." />
                  <Button
                    type="primary"
                    size="large"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      setModalStep(3);
                      console.log("직접 등록하기");
                    }}
                  >
                    직접 등록하기
                  </Button>
                </Space>
              ),
            }}
          />
        </Space>
      ) : (
        <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Form.Item style={{ margin: "0" }}>
            <Input placeholder="기관명을 입력해주세요." size="large" />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <Input placeholder="기관 주소를 입력해주세요." size="large" />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <Input placeholder="기관 전화번호를 입력해주세요." size="large" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

const renderFacility = (facility) => (
  <List.Item style={{ cursor: "pointer", padding: "8px 0" }}>
    <ListWrapper title={facility.name} description={facility.address} />
  </List.Item>
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

const ListWrapper = styled(List.Item.Meta)`
  padding: 16px;
  border-radius: 10px;
  background-color: #f5f5f5;

  &:hover {
    background-color: var(--selected-color);
  }
`;
