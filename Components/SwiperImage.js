import Image from "next/image";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperImage = ({ url, setMouseContent, alt }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  console.log

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
        <Image responsive fill objectFit="contain" src={url} alt={alt}/>
      </div>
    </>
  );
};

export default SwiperImage;
