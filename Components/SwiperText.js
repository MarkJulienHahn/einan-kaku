import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperText = ({ text, setMouseContent }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    swiperSlide.isActive && setMouseContent("←");
  });

  return (
    <div
      onClick={
        swiperSlide.isNext ? () => swiper.slideNext() : () => swiper.slidePrev()
      }
      onMouseEnter={
        swiperSlide.isNext
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
