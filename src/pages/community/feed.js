import { Button, Image, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
const { Text } = Typography;

function Feed() {
  const [selectedTab, setSelectedTab] = useState("홈");
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  // 더미 데이터 생성
  const generateFeedItems = (page) => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: (page - 1) * 5 + i + 1,
      name: "김철수",
      content: `친절한 의료진과 편안한 환경 요양병원에 입원한 지 두 달이 넘었는데, 의료진의 세심한 관리 덕분에 매우 만족하고 있습니다. 병원 분위기가 정말 편안하고, 직원들이 친절하게 대해줘서 마음이 놓입니다. 특히 물리치료와 재활 프로그램이 잘 구성되어 있어 빠르게 회복 중입니다. 병원 내 청결도 철저하고, 병실도 넓고 아늑해서 지내기 좋습니다.`,
      createdAt: "20시간 전",
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      type: "review",
    }));
  };

  // 페이지가 바뀔 때마다 데이터 로드
  useEffect(() => {
    setFeedItems((prev) => [...prev, ...generateFeedItems(page)]);
  }, [page]);

  // 사용자가 마지막 요소를 보면 페이지 증가
  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div>
      <TabContainer>
        <TabButton
          selected={selectedTab === "홈"}
          onClick={() => setSelectedTab("홈")}
        >
          홈
        </TabButton>
        <TabButton
          selected={selectedTab === "시설소식"}
          onClick={() => setSelectedTab("시설소식")}
        >
          🗞️ 시설소식
        </TabButton>
        <TabButton
          selected={selectedTab === "유저리뷰"}
          onClick={() => setSelectedTab("유저리뷰")}
        >
          🤔 유저리뷰
        </TabButton>
      </TabContainer>

      <FeedList>
        {feedItems.map((feed, index) => (
          <FeedItem
            key={feed.id}
            ref={index === feedItems.length - 1 ? ref : null}
          >
            <FeedHeader>
              <div style={{ fontWeight: "bold" }}>{feed.name}</div>
              <div style={{ fontSize: "12px", color: "var(--black-alpha-6)" }}>
                {feed.createdAt}
              </div>
            </FeedHeader>
            <Image src="/images/image.svg" alt="img" style={{ flex: "1" }} />
            <Content>{feed.content}</Content>
            <TabContainer>
              <ToolbarButton icon={<BsHandThumbsUp />}>
                {feed.likeCount}
              </ToolbarButton>
              <ToolbarButton icon={<AiOutlineComment />}>
                {feed.commentCount}
              </ToolbarButton>
              <ToolbarButton icon={<AiOutlineShareAlt />} />
            </TabContainer>
          </FeedItem>
        ))}
      </FeedList>
    </div>
  );
}

const FeedList = styled.div`
  background-color: var(--black-alpha-1);
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const FeedItem = styled.div`
  background-color: var(--bg-body);
  border-radius: 8px;
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
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Clamp to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  line-height: 1.4em; /* Line height */
  font-size: 14px;
  color: var(--black-alpha-9);
  padding: 16px;
  max-height: calc(1.4em * 4); /* 3 lines * 1.4em (line-height) */
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  padding: 0 16px 8px 16px;
  border-bottom: 1px solid var(--black-alpha-1);
`;

const TabButton = styled(Button)`
  padding: 4px 16px !important;
  border: 1px solid var(--black-alpha-1) !important;
  border-radius: 50px !important;
  cursor: pointer !important;
  color: var(--black-alpha-9) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: ${({ selected }) =>
    selected ? "var(--selected-color)" : "var(--bg-body)"} !important;
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

export default Feed;
