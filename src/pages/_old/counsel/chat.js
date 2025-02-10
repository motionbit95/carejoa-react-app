import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegionSelect from "../../search/regionSelect";
import { hospital_location } from "../../search/location";
import { Input, Button, Space, Tag, Typography } from "antd";
import styled from "styled-components";

function Counseling(props) {
  const [tempAnswer, setTempAnswer] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  const [step, setStep] = React.useState(0);
  const [editQuestionIndex, setEditQuestionIndex] = React.useState(-1);
  const navigate = useNavigate();

  const submitCounseling = () => {
    console.log(answers);
    let data = {
      userId: "test", // 누가 신청했는지 알아야한다.
      createdAt: Date.now(), // 언제 신청했는지 알아야한다.
      state: 0, // 상담 요청
      questions: questions,
      answers: answers,
    };

    navigate("/counseling");
  };

  useEffect(() => {
    fetch("./json/question.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // 부드러운 스크롤
    });
  }, [step]);

  return (
    <Container>
      {questions.map(
        (question, index) =>
          index <= step && (
            <Space key={index} direction="vertical" style={{ width: "100%" }}>
              <QuestionBox>
                {/* 질문입니다. */}
                <QuestionContainer>
                  <QuestionText>{question.question}</QuestionText>
                  <SubtitleText show={question.subtitle}>
                    {question.subtitle}
                  </SubtitleText>
                </QuestionContainer>

                {(!answers[index] || editQuestionIndex === index) && (
                  <>
                    {question.type === "text" ? (
                      <InputQuestion
                        question={question}
                        setTempAnswer={setTempAnswer}
                      />
                    ) : question.type === "location" ? (
                      <LocationQuestion
                        question={question}
                        tempAnswer={tempAnswer}
                        setTempAnswer={setTempAnswer}
                      />
                    ) : question.type === "select" ? (
                      <SelectQuestion
                        question={question}
                        tempAnswer={tempAnswer}
                        setTempAnswer={setTempAnswer}
                        index={index}
                        answers={answers}
                        setAnswers={setAnswers}
                        setEditQuestionIndex={setEditQuestionIndex}
                        step={step}
                        setStep={(step) => {
                          setStep(step);
                          if (step === questions.length) {
                            submitCounseling();
                            return;
                          }
                        }}
                      />
                    ) : (
                      <MultiSelectQuestion
                        question={question}
                        tempAnswer={tempAnswer}
                        setTempAnswer={setTempAnswer}
                      />
                    )}
                    {question.type !== "select" && (
                      <NextButton
                        tempAnswer={tempAnswer}
                        answers={answers}
                        setAnswers={setAnswers}
                        setStep={setStep}
                        step={step}
                        setEditQuestionIndex={setEditQuestionIndex}
                        setTempAnswer={setTempAnswer}
                        editQuestionIndex={editQuestionIndex}
                      />
                    )}
                  </>
                )}
              </QuestionBox>
              {answers[index] && (
                <AnswerContainer>
                  <AnswerBox>{answers[index]}</AnswerBox>
                  <EditText
                    onClick={() => {
                      setEditQuestionIndex(index);
                    }}
                  >
                    수정
                  </EditText>
                </AnswerContainer>
              )}
            </Space>
          )
      )}
    </Container>
  );
}

const InputQuestion = ({ question, setTempAnswer }) => (
  <Input
    size="large"
    placeholder={question.placeholder}
    onChange={(e) => setTempAnswer([e.target.value])}
  />
);

const LocationQuestion = ({ question, tempAnswer, setTempAnswer }) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <TagContainer>
      {tempAnswer?.map((answer, answerIndex) => (
        <Tag
          style={{
            textAlign: "left",
            width: "auto",
            margin: "4px",
            padding: "4px 8px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            fontSize: "14px",
            gap: "4px",
          }}
          closable
          key={answerIndex}
          onClick={() => {
            setTempAnswer(tempAnswer.filter((item) => item !== answer));
          }}
        >
          {answer}
        </Tag>
      ))}
    </TagContainer>
    <RegionSelect
      visibleType={false}
      setRegion={({ province, city }) => {
        let _province = Object.keys(hospital_location[province])[0];
        let _city =
          Object.values(hospital_location[province])[0].find(
            (item) => item.code === city
          )?.name || "전체";
        console.log(_province, _city);
        if (!tempAnswer) {
          setTempAnswer([_province + " " + _city]);
        } else {
          if (!tempAnswer?.includes(_province + " " + _city)) {
            setTempAnswer([...tempAnswer, _province + " " + _city]);
          } else {
            setTempAnswer(
              tempAnswer.filter((item) => item !== _province + " " + _city)
            );
          }
        }
      }}
    />
  </Space>
);
const SelectQuestion = ({
  question,
  tempAnswer,
  index,
  answers,
  setAnswers,
  setEditQuestionIndex,
  step,
  setStep,
}) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    {question.answer?.map((answer, answerIndex) => (
      <Button
        size="large"
        type={tempAnswer === answer ? "primary" : "default"}
        style={{ width: "100%" }}
        key={answerIndex}
        onClick={() => {
          answers[index] = answer;
          setAnswers([...answers]);
          setEditQuestionIndex(-1);
          // TODO: If the question is the last one, go to the next step.
          if (step + 1 >= question.length) {
            setStep(question.length);
          } else {
            setStep(step + 1);
          }
          setStep(step + 1);
        }}
      >
        {answer}
      </Button>
    ))}
  </Space>
);
const MultiSelectQuestion = ({ question, tempAnswer, setTempAnswer }) => {
  // tempAnswer가 null일 경우 빈 배열로 초기화
  const safeTempAnswer = Array.isArray(tempAnswer) ? tempAnswer : [];

  return (
    <Space
      direction="horizontal"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {question.answer?.map((answer, answerIndex) => (
        <Button
          size="large"
          type={safeTempAnswer.includes(answer) ? "primary" : "default"}
          key={answerIndex}
          onClick={() => {
            if (!safeTempAnswer.includes(answer)) {
              setTempAnswer([...safeTempAnswer, answer]);
            } else {
              setTempAnswer(safeTempAnswer.filter((item) => item !== answer));
            }
          }}
        >
          {answer}
        </Button>
      ))}
    </Space>
  );
};

const NextButton = ({
  tempAnswer,
  answers,
  setAnswers,
  setStep,
  step,
  setEditQuestionIndex,
  setTempAnswer,
  editQuestionIndex,
}) => (
  <Button
    size="large"
    type="primary"
    style={{ width: "100%", marginTop: "16px" }}
    disabled={!tempAnswer}
    onClick={() => {
      try {
        answers.push(tempAnswer.join(", "));
        setAnswers(answers);
        if (editQuestionIndex < 0) {
          setStep(step + 1);
        }
        setEditQuestionIndex(-1);
        setTempAnswer(null);
      } catch (error) {
        console.log(error);
        return;
      }
    }}
  >
    다음
  </Button>
);

const Container = styled(Space).attrs({ direction: "vertical" })`
  position: relative;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

const QuestionBox = styled.div`
  width: 80%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  border-top-left-radius: 0;
  background-color: white;
`;

const QuestionContainer = styled(Space).attrs({ direction: "vertical" })``;

const QuestionText = styled(Typography)`
  font-weight: bold;
  font-size: 16px;
  white-space: pre-line;
`;

const SubtitleText = styled(Typography)`
  font-size: 14px;
  white-space: pre-line;
  color: var(--black-alpha-6);
`;

const AnswerContainer = styled(Space).attrs({ direction: "vertical" })`
  align-items: flex-end;
  width: 100%;
`;

const AnswerBox = styled.div`
  max-width: 250px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  border-top-right-radius: 0;
  background-color: var(--black-alpha-7);
  color: white;
  font-weight: bold;
`;

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const EditText = styled(Typography)`
  cursor: pointer;
  text-decoration: underline;
  color: var(--black-alpha-6);
  font-size: 14px;
  font-weight: 600;
`;

export default Counseling;
