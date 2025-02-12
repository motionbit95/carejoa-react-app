import { Carousel, Image } from "antd";
import styled from "styled-components";
import { images } from "./data";

export const EventCarousel = () => {
  return (
    <Container>
      <Carousel autoplay>
        {images.map((banner) => (
          <ImageContainer key={banner.alt}>
            <Image
              preview={false}
              src={banner.image}
              alt={banner.alt}
              width={"100%"}
            />
          </ImageContainer>
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

const ImageContainer = styled.div``;
