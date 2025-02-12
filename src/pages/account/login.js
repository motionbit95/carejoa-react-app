import { Button, Form, Image, Input, message, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../../api";

function Login(props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const hadleLogin = async (values) => {
    console.log(values);
    await apiClient
      .post(`/users/login`, values)
      .then((response) => {
        console.log(response);
        messageApi.success("로그인 성공");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        messageApi.error("로그인 실패");
      });
  };
  return (
    <Center>
      {contextHolder}
      <Space direction="vertical" size={40} style={{ display: "flex" }}>
        <center>
          <Image
            src={"/images/logo.svg"}
            alt="Logo"
            height={48}
            width={200} // 반드시 width와 height를 지정해야 함
            priority={true} // 중요 이미지로 우선 로드
            preview={false}
          />
        </center>
        <Form form={form} onFinish={hadleLogin}>
          <Space
            direction="vertical"
            size={10}
            style={{ display: "flex", width: "100%" }}
          >
            <Form.Item name={"email"} style={{ margin: 0 }}>
              <Input
                placeholder="이메일을 입력해주세요."
                size="large"
                type="email"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name={"password"} style={{ margin: 0 }}>
              <Input.Password
                placeholder="비밀번호를 입력해주세요."
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              로그인
            </Button>
          </Space>
        </Form>

        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          <Typography
            style={{
              fontSize: 14,
              textAlign: "left",
              color: "var(--secondary-text)",
            }}
          >
            계정이 없으신가요?
          </Typography>
          <Button
            size="large"
            style={{ width: "100%" }}
            onClick={() => navigate("/account/signup")}
          >
            회원가입
          </Button>
        </Space>
      </Space>
    </Center>
  );
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 24px;
`;

export default Login;
