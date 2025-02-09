import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NoticeList(props) {
  const navigate = useNavigate();
  const notices = [
    {
      id: 1,
      title: "[공지] 케어조아 재오픈 안내",
      createdAt: "2024.09.01",
      content: `
      안녕하세요. 케어조아입니다.🙋‍♀️

보다 나은 품질 향상을 위하여 사이트가 개편되었습니다. 재정비 기간동안 불편함이 있으셨다면 너른 양해 부탁드립니다.

사이트 재정비로 인하여 사이트 주소가 아래와 같이 변경되었으니, 서비스 이용에 문의가 있으시면 고객센터 번호로 문의주세요.

https://carejoa.com

고객센터 : 1588-1234
(평일, 토요일 10:00~19:00)

앞으로 케어조아는 원활하게 서비스 이용을 하실 수 있도록 더욱 개선된 서비스 품질로 찾아뵙겠습니다!

고맙습니다.`,
    },
  ];
  return (
    <Container>
      {notices.map((notice) => (
        <NoticeItem
          key={notice.id}
          onClick={() => navigate(`/notice/${notice.id}`)}
        >
          <NoticeTitle>{notice.title}</NoticeTitle>
          <NoticeDate>{notice.createdAt}</NoticeDate>
        </NoticeItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoticeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NoticeTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const NoticeDate = styled.div`
  font-size: 12px;
  color: var(--black-alpha-5);
`;

export default NoticeList;
