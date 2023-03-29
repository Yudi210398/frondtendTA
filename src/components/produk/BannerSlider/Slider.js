import React from "react";
import Container from "../../shared/Container.js";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../shared/image/slider.png";
import slider2 from "../../shared/image/slider2.png";
import slider3 from "../../shared/image/slider3.png";
function Slider() {
  return (
    <Container>
      <br />
      <br />
      <br />

      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={slider1} alt="First slide" />
          <Carousel.Caption>
            <h3>PROFESIONAL</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider2} alt="Second slide" />

          <Carousel.Caption>
            <h3>ACCURATE</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider3} alt="Third slide" />

          <Carousel.Caption>
            <h3>ELEGANT</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Slider;
