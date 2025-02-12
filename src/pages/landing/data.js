import { Image } from "antd";
import {
  MdHealing,
  MdHealthAndSafety,
  MdLocalHospital,
  MdLocalHotel,
} from "react-icons/md";

export const services = [
  {
    name: "요양병원",
    description: "병원수준의 의료 서비스 제공",
    icon: MdLocalHospital,
    color: "#40CF69",
    bgcolor: "rgba(64, 207, 105, 0.2)",
  },
  {
    name: "요양원",
    description: "일상적인 돌봄과 지원",
    icon: MdHealing,
    color: "#3B6EFF",
    bgcolor: "rgba(59, 110, 255, 0.2)",
  },
  {
    name: "주야간보호",
    description: "일상적인 돌봄 서비스 제공",
    icon: MdHealthAndSafety,
    color: "#FE6D6A",
    bgcolor: "rgba(254, 109, 106, 0.2)",
  },
  {
    name: "실버타운",
    description: "일시적인 돌봄 제공",
    icon: MdLocalHotel,
    color: "#FFC001",
    bgcolor: "rgba(255, 192, 1, 0.2)",
  },
];

export const reviews = [
  {
    name: "요양병원",
    description:
      "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
    icon: MdLocalHospital,
  },
  {
    name: "요양원",
    description:
      "할머니를 병원에 모시면서 그동안 신경 써주신 의사선생님 간호사님들 요양보호사분 너무 감사합니다 다들 너무 친절하시고 좋았습니다.",
    icon: MdHealing,
  },
  {
    name: "요양원",
    description:
      "할머니를 병원에 모시면서 그동안 신경 써주신 의사선생님 간호사님들 요양보호사분 너무 감사합니다 다들 너무 친절하시고 좋았습니다.",
    icon: MdHealing,
  },
  {
    name: "요양병원",
    description:
      "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
    icon: MdLocalHospital,
  },
  {
    name: "요양병원",
    description:
      "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
    icon: MdLocalHospital,
  },
  {
    name: "요양병원",
    description:
      "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
    icon: MdLocalHospital,
  },
  {
    name: "요양병원",
    description:
      "원무과에서 달마다 병원비 청구를 하지 않고 몇달치를 한번에 현금으로 청구하셔서 당황했습니다... 원장님이 차분하게 환자의 상태를 설명해주셔서 좋았습니다.",
    icon: MdLocalHospital,
  },
];

export const BannerButtons = [
  {
    name: "지도검색",
    icon: <Image src={require("../../assets/landing/icon1.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "지역검색",
    icon: <Image src={require("../../assets/landing/icon2.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "제휴시설",
    icon: <Image src={require("../../assets/landing/icon3.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "요양원",
    icon: <Image src={require("../../assets/landing/icon4.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "요양병원",
    icon: <Image src={require("../../assets/landing/icon5.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "주야간보호",
    icon: <Image src={require("../../assets/landing/icon6.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "실버타운",
    icon: <Image src={require("../../assets/landing/icon7.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문요양",
    icon: <Image src={require("../../assets/landing/icon8.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문목욕",
    icon: <Image src={require("../../assets/landing/icon9.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "양로원",
    icon: <Image src={require("../../assets/landing/icon10.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "방문간호",
    icon: <Image src={require("../../assets/landing/icon11.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
  {
    name: "단기보호",
    icon: <Image src={require("../../assets/landing/icon12.png")} />,
    link: "https://cafe.naver.com/pinkqy5cg",
  },
];

export const Banners = [
  {
    image: require("../../assets/landing/Banner1.png"),
    alt: "Banner 1",
  },
  {
    image: require("../../assets/landing/Banner2.png"),
    alt: "Banner 2",
  },
  {
    image: require("../../assets/landing/Banner3.png"),
    alt: "Banner 3",
  },
];
