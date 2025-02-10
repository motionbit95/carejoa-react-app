import React, { useEffect } from "react";
import ImageUploader from "../../components/ImageUploader";
import { Button, Input, Select, Space } from "antd";

function Write(props) {
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleUpload = async (file) => {
    if (file) {
      if (images.includes(file.url)) {
        setImages(images.filter((image) => image !== file.url));
      } else {
        setImages([...images, file.url]);
      }
    }
  };
  return (
    <Space
      style={{ width: "100%", padding: "16px" }}
      size={10}
      direction="vertical"
    >
      <ImageUploader onUpload={handleUpload} />
      <div style={{ fontWeight: "bold", fontSize: "16px", marginTop: "16px" }}>
        카테고리 선택
      </div>
      <Select
        size="large"
        style={{ width: "100%" }}
        placeholder="카테고리를 선택해주세요."
      >
        <Select.Option value="1">시설소식</Select.Option>
        <Select.Option value="2">유저리뷰</Select.Option>
      </Select>
      <Input.TextArea
        size="large"
        placeholder="이곳에 글을 작성해주세요. (10자 이상)"
        style={{ height: "300px" }}
      />
      <div
        style={{
          padding: "16px",
          display: "flex",
          gap: "10px",
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
        <Button type="primary" size="large" style={{ width: "100%" }}>
          작성 완료
        </Button>
      </div>
    </Space>
  );
}

export default Write;
