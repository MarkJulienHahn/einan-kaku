import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRouter } from "next/router";

import SwiperImage from "./SwiperImage";
import SwiperText from "./SwiperText";

const ArbeitMobile = ({ image, setMouseContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  return (
    <div className="arbeitWrapper">
      {currentIndex == 0 && (
        <ul className="workInfo">
          <li>»{image.werkangaben.titel}«</li>
          <li>{image.werkangaben.untertitel}</li>
          <li>{image.werkangaben.jahr}</li>
          <li>{image.werkangaben.medium}</li>
          <li>{image.werkangaben.dimensionen}</li>
        </ul>
      )}

      <span className="close" onClick={() => router.push("/")}>
        ← Back
      </span>

      <Swiper slidesPerView={1.6} centeredSlides={true} spaceBetween={40}>
        <SwiperSlide>
          <SwiperImage
            url={image.titelbild.url}
            alt={image.titelbild.originalFilename}
            setCurrentIndex={setCurrentIndex}
            setMouseContent={setMouseContent}
          />
        </SwiperSlide>

        {image.arbeiten.map((arbeit, i) => (
          <SwiperSlide key={i}>
            <SwiperImage
              url={arbeit.bild?.url}
              alt={arbeit.bild?.originalFilename}
              setCurrentIndex={setCurrentIndex}
              setMouseContent={setMouseContent}
              vimeo={arbeit?.vimeoLink}
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

export default ArbeitMobile;