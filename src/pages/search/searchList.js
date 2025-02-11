import { Col, Image, Space, Tag } from "antd";
import React from "react";
import Distance from "./distance";

function SearchList(props) {
  const { device } = "mobile";
  const { item, currentPosition } = props;
  return (
    <Space
      size={16}
      style={{
        padding: device === "mobile" ? "4px" : "8px",
        boxSizing: "border-box",
      }}
    >
      <Image
        preview={false}
        width={device === "mobile" ? 110 : 100}
        height={device === "mobile" ? 110 : 110}
        src={item?.imgUrl || "images/MdHealthAndSafety.svg"}
        style={{
          borderRadius: 8,
          objectFit: "cover",
          border: "1px solid #f1f1f1",
        }}
      />
      <Space direction="vertical" size={2}>
        <strong
          style={{
            fontSize: device === "mobile" ? "14px" : "16px",
            color: "#141414",
          }}
        >
          {item?.yadmNm || ""}
        </strong>
        <div style={{ fontSize: "small" }}>{item?.addr || ""}</div>
        <Col span={24}>
          <Space>
            <Distance
              address={item?.addr}
              pos={{
                xPos: item?.XPos,
                yPos: item?.YPos,
              }}
              currentPosition={currentPosition}
            />
            <div>|</div>
            <div>{item?.telno || ""}</div>
          </Space>
        </Col>
        <Col span={24}>
          <div style={{ display: "flex" }}>
            <Tag>{item?.clCdNm}</Tag>
            <Tag>
              설립{" "}
              {new Date().getFullYear() -
                parseInt(item?.estbDd.toString().slice(0, 4))}
              년
            </Tag>
          </div>
        </Col>
      </Space>
    </Space>
  );
}

export default SearchList;
