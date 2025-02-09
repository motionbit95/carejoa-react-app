import { Button, Form } from "antd";
import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import styled from "styled-components";

const Signup = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = () => {
    console.log(form.getFieldsValue());
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
