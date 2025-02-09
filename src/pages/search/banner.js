import { Card, Carousel, Image } from "antd";
import React from "react";

function Banner(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image
        src={require("../../assets/dummy/advertise.png")}
        preview={false}
      />
    </div>
  );
}

export default Banner;
