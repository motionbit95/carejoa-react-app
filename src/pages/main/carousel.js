import { Carousel, Image } from "antd";
import styled from "styled-components";
import { images } from "./data";

export const EventCarousel = () => {
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
