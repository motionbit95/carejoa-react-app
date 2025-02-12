import { Button, Form, message } from "antd";
import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api";

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = () => {
    console.log(form.getFieldsValue());
    const data = form.getFieldsValue();
    apiClient
      .post(`/users/signup`, {
        nickname: data.name,
        email: data.email,
        password: data.password,
        type: data.facility ? "organization" : "person",
      })
      .then((response) => {
        console.log(response);
        messageApi.success(
          "회원가입을 완료했습니다. 로그인 페이지로 이동합니다."
        );
        navigate("/account/login");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        messageApi.error(error.response.data.error);
      });
  };

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

  return (
    <Container
      style={{
        position: "relative",
        minHeight: "calc(100vh - 60px)", // 100vh",
      }}
    >
      {contextHolder}
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

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

export default Signup;
