import { Button, Image, Input, Space, Typography } from "antd";
import React from "react";

function Login(props) {
  return (
    // <Center>
    <Space direction="vertical" size={40} style={{ display: "flex" }}>
      <center>
        {/* <Image
          src={require("../../")}
          alt="Logo"
          height={48}
          width={200} // 반드시 width와 height를 지정해야 함
          priority={true} // 중요 이미지로 우선 로드
        /> */}
      </center>
      <Space
        direction="vertical"
        size={10}
        style={{ display: "flex", width: "100%" }}
      >
        <Input
          placeholder="이메일을 입력해주세요."
          size="large"
          type="email"
          style={{ width: "100%" }}
        />
        <Input.Password
          placeholder="비밀번호를 입력해주세요."
          size="large"
          style={{ width: "100%" }}
        />
        <Button size="large" type="primary" style={{ width: "100%" }}>
          로그인
        </Button>
      </Space>

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
        <Button size="large" style={{ width: "100%" }}>
          회원가입
        </Button>
      </Space>
    </Space>
    // </Center>
  );
}

export default Login;
