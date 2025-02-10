import {
  Button,
  Carousel,
  Col,
  DatePicker,
  Flex,
  Input,
  Progress,
  Row,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EstimateItems from "./estimateItem";
import ImageUploader from "../../components/ImageUploader";
import RadioSelect from "../../components/RadioSelect";
import locale from "antd/es/date-picker/locale/ko_KR";
import { PlusOutlined } from "@ant-design/icons";

const Estimate = () => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [responses, setResponses] = useState({});

  const totalQuestions = EstimateItems.length;
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const handleSlideChange = (current) => {
    setCurrentSlide(current);
  };

  const handleSelect = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Container
      style={{
        position: "relative",
        minHeight: "calc(100vh - 60px)", // 100vh",
      }}
    >
      <EstimateCarousel
        carouselRef={carouselRef}
        handleSlideChange={handleSlideChange}
        handleSelect={handleSelect}
        responses={responses}
      />
      <div style={{ width: "100%", display: "flex", gap: "8px" }}>
        <Button
          onClick={() => carouselRef.current.prev()}
          disabled={currentSlide === 0}
          style={{
            width: "100%",
            display: currentSlide === 0 ? "none" : "block",
          }}
          size="large"
        >
          이전
        </Button>
        <Button
          type="primary"
          onClick={() => (console.log(responses), carouselRef.current.next())}
          size="large"
          style={{ width: "100%" }}
        >
          다음
        </Button>
      </div>
    </Container>
  );
};

const EstimateCarousel = (props) => {
  const {
    handleSlideChange,
    carouselRef,
    handleSelect,
    progressPercentage,
    responses,
  } = props;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Progress
        percent={progressPercentage}
        status="active"
        showInfo={false}
        strokeColor="#52c41a"
        style={{
          backgroundColor: "var(--bg-body)",
        }}
      />
      <Carousel
        fade
        dots={false}
        ref={carouselRef}
        afterChange={handleSlideChange}
      >
        {EstimateItems.map((item, index) => (
          <div key={index}>
            <Row gutter={[16, 16]} style={{ width: "100%", flex: 1 }}>
              <Col span={24}>
                <Step>
                  Step{item.step}.{" "}
                  {item.step === 1
                    ? "시설개요"
                    : item.step === 2
                    ? "치료 / 의료"
                    : item.step === 3
                    ? "요양 / 시설"
                    : item.step === 4
                    ? "본인부담금"
                    : ""}
                </Step>
              </Col>
              <Col span={24}>
                <Question>
                  <strong>Q{item.id} </strong>
                  {item.question}
                </Question>
              </Col>
              <Col span={24} style={{ flexGrow: 1, whiteSpace: "pre-line" }}>
                {item.description}
              </Col>
              <Col span={24} style={{ flexGrow: 1 }}>
                <ItemForm
                  item={item}
                  handleSelect={handleSelect}
                  responses={responses}
                />
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Space>
  );
};

const ItemForm = ({ item, handleSelect, responses }) => {
  switch (item.type) {
    case "input":
      return (
        <Input
          placeholder={item.question}
          size="large"
          onChange={(e) => handleSelect(item.id, e.target.value)}
        />
      );
    case "select":
      return (
        <RadioSelect
          options={item.items}
          selected={responses[item.id]}
          onChange={(value) => handleSelect(item.id, value)}
        />
      );
    case "placesearch":
      return (
        <Input
          placeholder="placeSearch"
          size="large"
          onChange={(e) => {
            console.log(e.target.value);
            handleSelect(item.id, e.target.value);
          }}
        />
      );
    case "upload":
      return <ImageUploader onUpload={() => {}} />;
    case "date":
      return (
        <DatePicker
          size="large"
          style={{ width: "100%" }}
          locale={locale}
          format="YYYY년 MM월 DD일"
          onChange={(date, dateString) => handleSelect(item.id, dateString)}
        />
      );
    case "inputnumber":
      return (
        <NumberInput onChange={handleSelect} id={item.id} data={item.items} />
      );
    case "equipment":
      return <EquimentInput onChange={handleSelect} id={item.id} />;
    case "selectmultiple":
      return (
        <Space>
          <div>여기</div>
        </Space>
      );
    case "calculatorInput":
      return <Calculator id={item.id} onChange={handleSelect} />;
    default:
      return null;
  }
};

const Calculator = ({ id, onChange }) => {
  const [number, setNumber] = useState(0);
  const [totals, setTotals] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // 쉼표 제거
    const validValue = isNaN(value) || value === "" ? 0 : parseInt(value);
    setNumber(validValue);

    setTotals(validValue * 30);

    onChange(id, validValue);
  };

  const formatNumber = (num) => {
    return num.toLocaleString(); // 숫자 포맷팅 (1000단위 쉼표 추가)
  };
  return (
    <div style={{ width: "100%" }}>
      <div>월 {totals.toLocaleString()}</div>
      <Input
        type="text"
        placeholder="0"
        size="large"
        addonAfter="원"
        value={formatNumber(number)}
        onChange={handleChange}
      />
    </div>
  );
};

// 인력 및 병실 숫자 입력 폼
const NumberInput = ({ onChange, id, data }) => {
  const [InputData, setInputData] = useState(data);
  const handleChange = (name, value) => {
    setInputData((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, value: value } : item
      )
    );

    onChange(id, [...InputData]);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {data.map((item, index) => (
        <Row style={{ width: "100%", alignItems: "center" }}>
          <Col span={6}>
            <div>{item.name}</div>
          </Col>
          <Col span={18}>
            <Input
              key={index}
              placeholder={item.name}
              size="large"
              onChange={(e) => handleChange(item.name, e.target.value)}
              addonAfter={item.addonAfter}
            />
          </Col>
        </Row>
      ))}
    </Space>
  );
};

// 장비 정보 입력 폼
const EquimentInput = ({ onChange, id }) => {
  const [equipment, setEquipment] = useState([
    { index: 1, name: "", quantity: 0 },
  ]);
  const addFormField = () => {
    setEquipment([
      ...equipment,
      { index: equipment.length + 1, name: "", quantity: 0 },
    ]);
  };

  const handleInputChange = (index, name, value) => {
    setEquipment((prev) =>
      prev.map((item) =>
        item.index === index ? { ...item, [name]: value } : item
      )
    );

    onChange(id, [...equipment]);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button icon={<PlusOutlined />} onClick={addFormField} />
      {equipment.map((item, index) => (
        <Flex gap={8}>
          <Input
            value={item.name}
            onChange={(e) =>
              handleInputChange(item.index, "name", e.target.value)
            }
            placeholder="장비명을 입력해주세요."
          />
          <Input
            value={item.quantity}
            placeholder="0"
            type="number"
            addonAfter="대"
            onChange={(e) =>
              handleInputChange(item.index, "quantity", e.target.value)
            }
          />
        </Flex>
      ))}
    </Space>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const Step = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: bold;
  color: var(--text-secondary-color);
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: bold;

  strong {
    color: var(--secondary-color);
  }
`;

export default Estimate;
