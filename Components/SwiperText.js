import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperText = ({ text, setMouseContent }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();


  return (
    <div
      onClick={
        swiperSlide.isActive || swiperSlide.isNext
          ? () => swiper.slideNext()
          : () => swiper.slidePrev()
      }
      onMouseEnter={
        swiperSlide.isActive || swiperSlide.isNext
          ? () => setMouseContent("→")
          : () => setMouseContent("←")
      }
      onMouseLeave={() => setMouseContent("")}
      className="swiperText"
    >
      <PortableText value={text} />
    </div>
  );
};

export default SwiperText;
