import { Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Mypage(props) {
  const navigate = useNavigate();
  const user = {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    password: "1q2w3e4r!",
    phone: "010-1234-5678",
    gender: "male",
  };

  const stats = [
    { id: 1, name: "포인트", stat: 1000 },
    { id: 2, name: "쿠폰", stat: 3 },
    { id: 3, name: "관심시설", stat: 2 },
  ];

  const menu = [
    {
      id: 1,
      name: "나의활동",
      children: [
        {
          id: "favorite",
          name: "관심시설",
        },
        {
          id: "order",
          name: "상담신청",
        },
        {
          id: "review",
          name: "이용후기",
        },
      ],
    },
    {
      id: 2,
      name: "고객센터",
      children: [
        {
          id: "notice",
          name: "공지사항",
        },
        {
          id: "event",
          name: "이벤트",
        },
        {
          id: "faq",
          name: "FAQ",
        },
        {
          id: "setting",
          name: "설정",
        },
      ],
    },
  ];

  const CardItem = ({ stat, name }) => {
    return (
      <CardContainer>
        <CardTitle>{stat}</CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardContainer>
    );
  };

  const MenuItem = ({ name, children }) => {
    return (
      <MenuItemContainer>
        <MenuItemText>{name}</MenuItemText>
        {children.map((child) => (
          <MenuItemTitle key={child.id}>{child.name}</MenuItemTitle>
        ))}
      </MenuItemContainer>
    );
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Container>
        <ProfileWrapper>
          <ProfileText>{user.name}</ProfileText>
          <TextButton onClick={() => navigate(`/mypage/profile/${user.id}`)}>
            프로필 수정
          </TextButton>
        </ProfileWrapper>
        <CardWrapper>
          {stats.map((stat) => (
            <CardItem key={stat.id} stat={stat.stat} name={stat.name} />
          ))}
        </CardWrapper>
      </Container>
      <MenuContainer>
        {menu.map((item) => (
          <MenuItem key={item.id} name={item.name} children={item.children} />
        ))}
      </MenuContainer>
    </Space>
  );
}

const Container = styled.div`
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--black-alpha-1);
  border-radius: 10px;
  width: 100%;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: var(--black-alpha-5);
`;

const MenuContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const MenuItemContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  width: 100%;

  background-color: white;
`;

const MenuItemText = styled.div`
  font-size: 14px;
  color: var(--black-alpha-5);
`;

const MenuItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 4px 0;
  width: 100%;
`;

const ProfileText = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const TextButton = styled.div`
  cursor: pointer;
  color: var(--black-alpha-5);
  font-size: 12px;
`;

export default Mypage;
