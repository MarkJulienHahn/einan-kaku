import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SwiperImage from "./SwiperImage";
import SwiperText from "./SwiperText";
import MouseElement from "./MouseElement";

const Arbeit = ({ image, setFocus, mouseContent, setMouseContent }) => {
  console.log(image);

  return (
    <div className="arbeitWrapper">
      <ul className="workInfo">
        <li>»{image.werkangaben.titel}«</li>
        <li>{image.werkangaben.untertitel}</li>
        <li>{image.werkangaben.jahr}</li>
        <li>{image.werkangaben.medium}</li>
        <li>{image.werkangaben.dimensionen}</li>
      </ul>

      <span className="close" onClick={() => setFocus(false)}>
        ← Back
      </span>

      <MouseElement mouseContent={mouseContent} />
        <Swiper slidesPerView={1.8} spaceBetween={5} centeredSlides={true}>
          <SwiperSlide>
            <SwiperImage
              url={image.titelbild.url}
              setMouseContent={setMouseContent}
            />
          </SwiperSlide>

          {image.arbeiten.map((arbeit, i) => (
            <SwiperSlide key={i}>
              <SwiperImage
                url={arbeit.bild.url}
                setMouseContent={setMouseContent}
              />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <SwiperText
              text={image.beschreibung}
              setMouseContent={setMouseContent}
            />
          </SwiperSlide>
        </Swiper>
    </div>
  );
};

export default Arbeit;
