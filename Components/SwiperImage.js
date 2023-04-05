import { useEffect } from "react";
import Image from "next/image";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperImage = ({ url, setMouseContent, alt, setCurrentIndex, vimeo }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    setCurrentIndex(swiper.activeIndex);
  });

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
        {vimeo ? (
          <div className="vimeoWork">
            <iframe
              src={`https://player.vimeo.com/video/${vimeo}?background=1&muted=1`}
              width="auto"
              height="auto"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            ></iframe>
          </div>
        ) : (
          <Image responsive fill objectFit="contain" src={url} alt={alt} />
        )}
      </div>
    </>
  );
};

export default SwiperImage;
