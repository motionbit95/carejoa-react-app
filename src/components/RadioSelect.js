import { Button, Space } from "antd";
import styled from "styled-components";

const RadioSelect = ({ options, selected, onChange }) => {
  return (
    <AnswerContainer direction="vertical">
      {options.map((option) => (
        <AnswerButton
          key={option}
          selected={selected === option}
          onClick={() => onChange(option)}
        >
          {option}
        </AnswerButton>
      ))}
    </AnswerContainer>
  );
};

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AnswerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? "#E6F7FF" : "#fff")};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #e6f7ff;
  }
`;

export default RadioSelect;
