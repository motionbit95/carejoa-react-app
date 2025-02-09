import { Alert, Divider, Empty, Input, Space } from "antd";
import React from "react";
import styled from "styled-components";

function Coupon(props) {
  const coupons = [
    {
      id: 1,
      name: "포인트 1,000원 할인권",
      expireAt: "2023.01.01",
      description: "10,000 포인트 이상 충전시 1,000원 할인",
    },
  ];
  return (
    <Container>
      <Wrapper>
        <Title>쿠폰 등록</Title>
        <Input.Search
          size="large"
          placeholder="쿠폰 번호를 입력해주세요."
          enterButton="등록"
          onSearch={(value) => console.log(value)}
        />
        <Alert
          message={<strong>유의사항</strong>}
          description={
            <div>
              <li>만료 후 30일이 지난 쿠폰은 조회되지 않습니다.</li>
              <li>쿠폰 사용 내역은 상담 신청 내역에서 확인하세요.</li>
            </div>
          }
          type="info"
          showIcon
        />
      </Wrapper>
      <Wrapper>
        <Title>보유 쿠폰 {coupons.length}장</Title>
        <Divider style={{ margin: "0" }} />
        {coupons.map((coupon) => (
          <CouponItem key={coupon.id}>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <CouponTitle>{coupon.name}</CouponTitle>
              <CouponDescription>~{coupon.expireAt}</CouponDescription>
            </Space>
            <CouponDescription>{coupon.description}</CouponDescription>
          </CouponItem>
        ))}
        {coupons.length === 0 && (
          <Empty description="보유한 쿠폰이 없습니다." />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  gap: 32px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CouponItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const CouponTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const CouponDescription = styled.div`
  font-size: 14px;
  color: var(--black-alpha-5);
`;

export default Coupon;
