import Banner from "../landing/banner";
import LandingHeader from "../landing/header";
import { Cards } from "./cards";
import { EventCarousel } from "./carousel";
import { Review } from "./review";

const Main = () => {
  return (
    <div style={{ position: "relative" }}>
      <LandingHeader />
      <Banner />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#D9D9D9",
          gap: "8px",
        }}
      >
        <Cards title="우리 지역 요양시설" />
        <Cards title="케어조아 추천 시설" />
        <EventCarousel />
        <Review title="유저들의 리얼리뷰 📌" />
        <Review title="NEW 시설 소식" />
      </div>
    </div>
  );
};

export default Main;
