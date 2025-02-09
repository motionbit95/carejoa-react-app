import { cyan } from "@ant-design/colors";
import { Button, Divider, Input, Popover, Radio, Space } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FilterOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Styled Components
const FilterButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? cyan[1] : "#f1f1f1")};
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  color: ${({ isSelected }) => (isSelected ? cyan[6] : "#141414")};
`;

const RadioButton = styled(Radio.Button)`
  color: #141414 !important;
  font-weight: 600;
  background-color: ${({ isSelected }) =>
    isSelected ? cyan[1] : "transparent"} !important;
  border-color: #d9d9d9 !important;
  border-radius: 40px !important;
`;

const PopoverTitle = ({ text }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "flex-start",
      padding: "8px 16px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontWeight: "bold", fontSize: "16px" }}>{text}</div>
  </div>
);

// Main Filter Component
function Filter() {
  const { device } = "mobile";
  const [filter, setFilter] = useState({ size: "A", grade: "A", date: "A" });
  const [popoverVisibility, setPopoverVisibility] = useState({
    size: false,
    grade: false,
    date: false,
  });
  const navigate = useNavigate();

  // Load filter settings from the URL (on component mount or refresh)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const size = searchParams.get("size");
    const grade = searchParams.get("grade");
    const date = searchParams.get("date");
    setFilter({ size: size || "A", grade: grade || "A", date: date || "A" });
  }, []);

  // Update the URL with the filter values as query parameters when filter state changes
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filter.size !== "A") queryParams.append("size", filter.size);
    if (filter.grade !== "A") queryParams.append("grade", filter.grade);
    if (filter.date !== "A") queryParams.append("date", filter.date);

    const currentSearchParams = new URLSearchParams(window.location.search);
    if (
      currentSearchParams.get("size") !== filter.size ||
      currentSearchParams.get("grade") !== filter.grade ||
      currentSearchParams.get("date") !== filter.date
    ) {
      navigate({
        pathname: window.location.pathname,
        search: queryParams.toString(),
      });
    }
  }, [filter, navigate]);

  const handleRadioChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    setPopoverVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: false,
    }));
  }, []);

  return (
    <MobileFilter
      filter={filter}
      onChange={handleRadioChange}
      popoverVisibility={popoverVisibility}
      setPopoverVisibility={setPopoverVisibility}
    />
  );
}

// Desktop Filter Component
const MobileFilter = ({
  filter,
  onChange,
  popoverVisibility,
  setPopoverVisibility,
}) => (
  <Space
    direction="vertical"
    style={{
      paddingBlock: 16,
      boxSizing: "border-box",
      width: "100%",
    }}
  >
    <SearchSection />
    <FilterSection
      filter={filter}
      onChange={onChange}
      popoverVisibility={popoverVisibility}
      setPopoverVisibility={setPopoverVisibility}
    />
    <DividerSection />
  </Space>
);

// Search Section (Name search)
const SearchSection = () => <Input.Search placeholder="기관 이름 입력" />;

// Divider Section
const DividerSection = () => (
  <Divider type="horizontal" style={{ margin: 0 }} />
);

// Filter Section (Size, Grade, Date popovers)
const FilterSection = ({
  filter,
  onChange,
  popoverVisibility,
  setPopoverVisibility,
}) => (
  <Space direction="horizontal" size={16} style={{ width: "100%" }}>
    <PopoverFilter
      title="시설 규모"
      name="size"
      options={["A", "대형", "중형", "소형"]}
      filter={filter}
      onChange={onChange}
      preset=""
      visible={popoverVisibility.size}
      setVisible={(visibility) =>
        setPopoverVisibility((prev) => ({ ...prev, size: visibility }))
      }
    />
    <PopoverFilter
      title="평가 등급"
      name="grade"
      options={["A", "1", "2", "3", "4", "5"]}
      preset="등급"
      filter={filter}
      onChange={onChange}
      visible={popoverVisibility.grade}
      setVisible={(visibility) =>
        setPopoverVisibility((prev) => ({ ...prev, grade: visibility }))
      }
    />
    <PopoverFilter
      title="설립 연도"
      name="date"
      options={["A", "2", "5", "10"]}
      preset="년 이내"
      filter={filter}
      onChange={onChange}
      visible={popoverVisibility.date}
      setVisible={(visibility) =>
        setPopoverVisibility((prev) => ({ ...prev, date: visibility }))
      }
    />
  </Space>
);

// Popover Filter Component
const PopoverFilter = ({
  title,
  name,
  options,
  filter,
  onChange,
  visible,
  setVisible,
  preset = "",
}) => (
  <Popover
    placement="rightTop"
    title={<PopoverTitle text={title} />}
    content={
      <Radio.Group
        value={filter[name]}
        buttonStyle="solid"
        onChange={onChange}
        name={name}
      >
        <Space size="small">
          {options.map((option) => (
            <RadioButton
              key={option}
              isSelected={filter[name] === option}
              value={option}
            >
              {option === "A" ? "전체" : `${option}${preset}`}
            </RadioButton>
          ))}
        </Space>
      </Radio.Group>
    }
    trigger="click"
    visible={visible}
    onVisibleChange={setVisible}
  >
    <FilterButton isSelected={filter[name] !== "A"}>
      <div>{title}</div>
      <RightOutlined />
    </FilterButton>
  </Popover>
);

export default Filter;
