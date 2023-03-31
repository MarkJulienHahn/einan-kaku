import Image from "next/image";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperImage = ({ url, setMouseContent }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  return (
    <>
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
      >
        <Image responsive fill objectFit="contain" src={url} />
      </div>
    </>
  );
};

export default SwiperImage;
