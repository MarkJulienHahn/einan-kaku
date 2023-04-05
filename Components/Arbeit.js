import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRouter } from "next/router";

import SwiperImage from "./SwiperImage";
import SwiperText from "./SwiperText";
import MouseElement from "./MouseElement";

const Arbeit = ({ image, mouseContent, setMouseContent }) => {
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

      <MouseElement mouseContent={mouseContent} />
      <Swiper slidesPerView={1.8} centeredSlides={true} spaceBetween={30}>
        <SwiperSlide>
          <SwiperImage
            url={image.titelbild.url}
            alt={image.titelbild.originalFilename}
            setMouseContent={setMouseContent}
            setCurrentIndex={setCurrentIndex}
            blurHash={image.titelbild.blurHash}
          />
        </SwiperSlide>

        {image.arbeiten.map((arbeit, i) => (
          <SwiperSlide key={i}>
            <SwiperImage
              url={arbeit.bild?.url}
              alt={arbeit.bild?.originalFilename}
              setMouseContent={setMouseContent}
              setCurrentIndex={setCurrentIndex}
              blurHash={arbeit.bild?.blurHash}
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

export default Arbeit;
