import { Button, Col, Divider, Image, Row, Space } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import { MessageFilled } from "@ant-design/icons";

import Talk from "../assets/Icon/talk.svg";
import KakaoTalk from "../assets/Icon/bt_kakao.svg";
import Blog from "../assets/Icon/blog.svg";
import styled from "styled-components";

function Footer(props) {
  return (
    <Row
      gutter={[16, 32]}
      style={{
        maxWidth: "1024px",
        margin: "0 auto",
        paddingBlock: 32,
        paddingInline: 16,
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Image
              src={"images/logo.svg"}
              preview={false}
              style={{
                cursor: "pointer",
                height: 24,
                opacity: 0.7,
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </Col>
          <Col span={24}>
            <Space direction={"vertical"}>
              <Space>
                <Text>(주) 케이뷰틱스</Text>
                <Divider
                  type="vertical"
                  style={{
                    height: 16,
                  }}
                />

                <Text>대표이사 박대수</Text>
              </Space>

              <Text>서울특별시 종로구 케어조아로 5</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space direction={"vertical"}>
              <Text>사업자등록번호 693-47-00786</Text>
              <Text>통신판매업신고 제2024-경기부천-0123호</Text>
            </Space>
          </Col>
          <Divider style={{ margin: 8 }} />
          <Row gutter={[16, 48]} style={{ width: "100%" }}>
            <Col span={24}>
              <Space size={16} direction="vertical">
                <Text style={{ fontWeight: "bold" }}>고객센터</Text>
                <Button icon={<Image src={Talk} preview={false} width={16} />}>
                  카톡으로 상담하기
                </Button>
                <Text>케어조아 고객센터는 카카오톡으로 운영중입니다.</Text>
                <Space direction={"vertical"}>
                  <Text>평일(월~금) : 10:00~17:00</Text>
                  <Text>주말(토요일) : 13:00~17:00 (일요일, 공휴일 제외)</Text>
                </Space>
                <Text>procos@hanmail.net</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space size={8} direction="vertical">
                <Text style={{ fontWeight: "bold" }}>SNS</Text>
                <Space>
                  <Image src={KakaoTalk} preview={false} width={32} />
                  <Image src={Blog} preview={false} width={32} />
                </Space>
              </Space>
            </Col>
          </Row>
        </Row>
      </Col>
    </Row>
  );
}

const Text = styled.div`
  font-size: 12px;
`;

export default Footer;
