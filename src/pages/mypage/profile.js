import { Button, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const { Item } = Form;

function Profile(props) {
  const location = useLocation();
  const [form] = Form.useForm();

  const users = [
    {
      id: 1,
      name: "김철수",
      email: "kim@example.com",
      password: "1q2w3e4r!",
      phone: "010-1234-5678",
      gender: "male",
    },
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = Number(location.pathname.split("/").pop());
    const foundUser = users.find((u) => u.id === userId);
    setUser(foundUser);

    if (foundUser) {
      form.setFieldsValue(foundUser); // 상태가 변경되면 폼 필드 업데이트
    }
  }, [location, form]);

  return (
    <Container
      style={{
        position: "relative",
        minHeight: "calc(100vh - 60px)", // 100vh",
      }}
    >
      <Form form={form} layout="vertical">
        <Title>회원정보</Title>
        <Item label="이름" name="name">
          <Input size="large" />
        </Item>
        <Item label="이메일" name="email">
          <Input size="large" />
        </Item>
        <Item label="비밀번호" name="password">
          <Input.Password size="large" />
        </Item>
        <Item label="전화번호" name="phone">
          <Input size="large" />
        </Item>
        <Item label="성별" name="gender">
          <Radio.Group size="large" style={{ display: "flex" }}>
            <Radio.Button
              value="male"
              style={{ width: "50%", textAlign: "center" }}
            >
              남자
            </Radio.Button>
            <Radio.Button
              value="female"
              style={{ width: "50%", textAlign: "center" }}
            >
              여자
            </Radio.Button>
          </Radio.Group>
        </Item>
      </Form>
      <Button
        type="primary"
        size="large"
        style={{
          width: "100%",
          fontWeight: "bold",
        }}
      >
        수정하기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 18px;
`;

export default Profile;
