const EstimateItems = [
  {
    id: 1,
    question: "요양시설 이름 입력",
    type: "input",
    step: 1,
  },
  {
    id: 2,
    question: "요양시설 사진 등록",
    type: "upload",
    step: 1,
  },
  {
    id: 3,
    question: "주소 입력",
    description: "요양시설의 주소를 입력해주세요.",
    type: "placesearch",
    step: 1,
  },
  {
    id: 4,
    question: "전화번호 입력",
    description: "상담 연락이 가능한 요양시설의 전화번호를 입력해주세요.",
    type: "input",
    step: 1,
  },
  {
    id: 5,
    question: "요양시설 등급",
    description:
      "정부에서는 주기적으로 요양시설의 적정성을 평가합니다. 가장 높은 점수는 A등급이며 E등급까지 있습니다. 신설의 경우 등급이 없을 수 있습니다.",
    type: "select",
    step: 1,
    items: ["A등급", "B등급", "C등급", "D등급", "E등급", "상관없음"],
  },
  {
    id: 6,
    question: "요양시설 크기(허가병상)",
    description:
      "대형 : 100인 이상\n중형 : 30~100인\n소형 : 10~30인\n치매전담형 : 16인 이하",
    type: "select",
    step: 1,
    items: ["대형", "중형", "소형", "치매전담형", "상관없음"],
  },
  {
    id: 7,
    question: "특화영역",
    type: "select",
    step: 1,
    items: ["암특화", "재활특화", "혈액투석", "양한방협진", "기타"],
  },
  {
    id: 8,
    question: "설립일자",
    type: "date",
    step: 1,
  },
  {
    id: 9,
    question: "의료인력",
    type: "inputnumber",
    step: 2,
    items: [
      {
        name: "의사",
        addonAfter: "명",
      },
      {
        name: "치과의사",
        addonAfter: "명",
      },
      {
        name: "한의사",
        addonAfter: "명",
      },
    ],
  },
  {
    id: 10,
    question: "진료과목(전문의 수)",
    type: "inputnumber",
    step: 2,
    items: [
      {
        name: "내과",
        addonAfter: "명",
      },
      {
        name: "재활의학과",
        addonAfter: "명",
      },
      {
        name: "가정의학과",
        addonAfter: "명",
      },
      {
        name: "신경외과",
        addonAfter: "명",
      },
      {
        name: "한방내과",
        addonAfter: "명",
      },
      {
        name: "침구과",
        addonAfter: "명",
      },
    ],
  },
  {
    id: 11,
    question: "치료인력",
    type: "inputnumber",
    step: 2,
    items: [
      {
        name: "물리치료사",
        addonAfter: "명",
      },
      { name: "작업치료사", addonAfter: "명" },
      { name: "물리치료실", addonAfter: "실" },
    ],
  },
  {
    id: 12,
    question: "의료장비",
    type: "equipment",
    step: 2,
  },
  {
    id: 13,
    question: "요양프로그램 선택",
    description:
      "요양시설에서는 여러가지 요양 프로그램을 제공합니다. 또한 거동이 불편한 어르신을 위해서 종교활동을 지원하기도 합니다. 원하시는 프로그램을 선택해주세요.",
    type: "selectmultiple",
    step: 3,
    items: [
      "운동보조",
      "인지기능향상",
      "불교",
      "천주교",
      "기독교",
      "기타",
      "재활특화",
      "치매특화",
      "맞춤형서비스",
    ],
  },
  {
    id: 14,
    question: "요양인력",
    type: "inputnumber",
    step: 3,
    items: [
      { name: "사회복지사", addonAfter: "명" },
      { name: "영양사", addonAfter: "명" },
      { name: "조리사", addonAfter: "명" },
    ],
  },
  {
    id: 15,
    question: "요양비용",
    discreption:
      "상급침실 비용이 높은 곳은 고급형, 평균적인 곳은 일반형, 상대적으로 낮은 비용인 곳은 실속형으로 구분하였습니다. 원하시는 비용 형태를 선택 하세요.",
    type: "select",
    step: 3,
    items: ["고급형", "일반형", "실속형", "상관없음"],
  },
  {
    id: 16,
    question: "침실구성",
    type: "inputnumber",
    step: 3,
    items: [
      { name: "상급병상", addonAfter: "개" },
      { name: "일반병상", addonAfter: "개" },
      { name: "격리병상", addonAfter: "개" },
    ],
  },
  {
    id: 17,
    question: "입원비(일)",
    type: "calculatorInput",
    step: 4,
  },
  {
    id: 18,
    question: "식대(일)",
    type: "calculatorInput",
    step: 4,
  },
  {
    id: 19,
    question: "비급여 상급병상(일)",
    type: "calculatorInput",
    step: 4,
  },
  {
    id: 20,
    question: "비급여 간병비(일)",
    type: "calculatorInput",
    step: 4,
  },
];

export default EstimateItems;
