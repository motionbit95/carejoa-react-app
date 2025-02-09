import { Checkbox } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const Step1 = ({ setIsChecked }) => {
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleCheckChange = (key, checked) => {
    let newCheckedItems = { ...checkedItems, [key]: checked };

    if (key === "all") {
      // "약관에 모두 동의"가 선택되면 나머지 체크박스도 모두 선택
      newCheckedItems = {
        all: checked,
        age: checked,
        terms: checked,
        privacy: checked,
        marketing: checked, // 선택 항목도 포함
      };
    } else {
      // 개별 체크 변경 시 "all" 상태 업데이트
      newCheckedItems.all = ["age", "terms", "privacy", "marketing"].every(
        (k) => newCheckedItems[k]
      );
    }

    setCheckedItems(newCheckedItems);
    setIsChecked(
      newCheckedItems.age && newCheckedItems.terms && newCheckedItems.privacy
    );
  };

  return (
    <Section>
      <BodyText>이용약관에 동의해주세요.</BodyText>
      <CheckItem
        label="약관에 모두 동의"
        checked={checkedItems.all}
        onChange={(checked) => {
          handleCheckChange("all", checked);
        }}
        style={{
          backgroundColor: "rgba(241, 241, 241, 0.5)",
          border: "1px solid #d9d9d9",
        }}
      />
      <CheckList checkedItems={checkedItems} onChange={handleCheckChange} />
    </Section>
  );
};

const CheckItem = ({ label, checked, onChange, style }) => (
  <Checkbox
    style={{
      padding: "12px",
      width: "100%",
      borderRadius: "10px",
      ...style,
    }}
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
  >
    {label}
  </Checkbox>
);

const CheckList = ({ checkedItems, onChange }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <CheckItem
      label="(필수) 만 14세 이상입니다."
      checked={checkedItems.age}
      onChange={(checked) => onChange("age", checked)}
    />
    <CheckWrapper>
      <CheckItem
        label="(필수) 이용약관에 동의합니다."
        checked={checkedItems.terms}
        onChange={(checked) => onChange("terms", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
    <CheckWrapper>
      <CheckItem
        label="(필수) 개인정보 수집 및 이용동의"
        checked={checkedItems.privacy}
        onChange={(checked) => onChange("privacy", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
    <CheckWrapper>
      <CheckItem
        label="(선택) 마케팅 정보 수신 동의"
        checked={checkedItems.marketing}
        onChange={(checked) => onChange("marketing", checked)}
      />
      <ViewButton>보기</ViewButton>
    </CheckWrapper>
  </div>
);

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BodyText = styled.div`
  font-size: 14px;
  color: var(--black-alpha-9);
  margin-top: 16px;
`;

const CheckWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-contents: space-between;
`;

const ViewButton = styled.div`
  font-weight: bold;
  text-decoration: underline;
  cusor: pointer;
  color: var(--black-alpha-9);
  white-space: nowrap;
  padding-inline: 16px;
`;

export default Step1;
