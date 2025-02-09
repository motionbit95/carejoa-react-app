import { Button, Image, Input } from "antd";
import React, { useState, useEffect } from "react";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import styled from "styled-components";

function Post() {
  const [selectedTab, setSelectedTab] = useState("홈");
  const [feedItem, setFeedItem] = useState([]);
  const [page, setPage] = useState(1);

  const comments = [
    {
      id: 1,
      name: "김철수",
      content:
        "친절한 의료진과 편안한 환경 요양병원에 입원한 지 두 달이 넘었는데, 의료진의 세심한 관리 덕분에 매우 만족하고 있습니다.",
      feed_id: 1,
      createdAt: "20시간 전",
    },
  ];

  // 페이지가 바뀔 때마다 데이터 로드
  useEffect(() => {
    setFeedItem({
      id: parseInt(window.location.pathname.split("/").pop()),
      name: "김철수",
      content: `친절한 의료진과 편안한 환경 요양병원에 입원한 지 두 달이 넘었는데, 의료진의 세심한 관리 덕분에 매우 만족하고 있습니다. 병원 분위기가 정말 편안하고, 직원들이 친절하게 대해줘서 마음이 놓입니다. 특히 물리치료와 재활 프로그램이 잘 구성되어 있어 빠르게 회복 중입니다. 병원 내 청결도 철저하고, 병실도 넓고 아늑해서 지내기 좋습니다.`,
      createdAt: "20시간 전",
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      type: "review",
    });
  }, [page]);

  return (
    <div>
      <FeedItem>
        <FeedHeader>
          <div style={{ fontWeight: "bold" }}>{feedItem.name}</div>
          <div style={{ fontSize: "12px", color: "var(--black-alpha-6)" }}>
            {feedItem.createdAt}
          </div>
        </FeedHeader>
        <Image src="/images/image.svg" alt="img" style={{ flex: "1" }} />
        <Content>{feedItem.content}</Content>
        <TabContainer>
          <ToolbarButton icon={<BsHandThumbsUp />}>
            {feedItem.likeCount}
          </ToolbarButton>
          <ToolbarButton icon={<AiOutlineComment />}>
            {feedItem.commentCount}
          </ToolbarButton>
          <ToolbarButton icon={<AiOutlineShareAlt />} />
        </TabContainer>
      </FeedItem>
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <div style={{ fontWeight: "bold" }}>{comment.name}</div>
            <div style={{ fontSize: "12px", color: "var(--black-alpha-6)" }}>
              {comment.createdAt}
            </div>
            <div>{comment.content}</div>
          </CommentItem>
        ))}
      </CommentList>
      <div
        style={{
          padding: "16px",
          display: "flex",
          gap: "10px",
          borderTop: "1px solid var(--black-alpha-1)",
          position: "fixed", // 바닥에 고정
          bottom: "0", // 화면 하단에 고정
          left: "50%", // 화면 중앙에 배치
          transform: "translateX(-50%)", // 정확히 중앙에 오도록 이동
          maxWidth: "480px", // 최대 너비 설정
          width: "100%", // 화면 너비에 맞게 확장
          backgroundColor: "var(--bg-body)", // 배경 색상 설정
          zIndex: 100, // 다른 요소 위에 표시되도록 설정
        }}
      >
        <Input
          size="large"
          placeholder="댓글을 입력해주세요."
          style={{ flex: 1 }}
        />
        <Button
          size="large"
          type="primary"
          icon={<FiSend />}
          style={{
            borderRadius: "50px",
            padding: "4px 16px",
          }}
        ></Button>
      </div>
    </div>
  );
}

const CommentList = styled.div`
  background-color: var(--bg-body);
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeedItem = styled.div`
  background-color: var(--bg-body);
  display: flex;
  flex-direction: column;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 16px;
`;

const Content = styled.div`
  padding: 10px;
  white-space: pre-line;
  line-height: 1.5;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  padding: 0 16px 8px 16px;
  border-bottom: 1px solid var(--black-alpha-1);
`;

const ToolbarButton = styled(Button)`
  padding: 4px 16px !important;
  border: 1px solid var(--black-alpha-1) !important;
  border-radius: 50px !important;
  cursor: pointer !important;
  color: var(--black-alpha-9) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

export default Post;
