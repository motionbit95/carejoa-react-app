import { Carousel, Image } from "antd";
import styled from "styled-components";

export const EventCarousel = () => {
  const images = [
    {
      image: require("../../assets/dummy/Coupon1.png"),
      alt: "coupon1",
    },
    {
      image: require("../../assets/dummy/Coupon1.png"),
      alt: "coupon2",
    },
  ];
  return (
    <Container>
      <Carousel autoplay>
        {images.map((banner) => (
          <div key={banner.alt}>
            <Image src={banner.image} alt={banner.alt} />
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
  background-color: white;
`;
