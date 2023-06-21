import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import { useSwiperSlide, useSwiper } from "swiper/react";
import useWindowDimensions from "@/Hooks/useWindowDimensions";

const SwiperText = ({ text, setMouseContent }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const { windowHeight } = useWindowDimensions();

  const ref = useRef();

  console.log(ref.current?.clientHeight, windowHeight);

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
      style={{
        justifyContent:
          ref.current?.clientHeight < windowHeight ? "center" : "flex-start",
      }}
    >
      <div ref={ref}>
        <PortableText value={text} />
      </div>
    </div>
  );
};

export default SwiperText;
