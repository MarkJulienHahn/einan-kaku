import { useEffect, useRef } from "react";
import Image from "next/image";
import { useSwiperSlide, useSwiper } from "swiper/react";

const SwiperImage = ({
  url,
  setMouseContent,
  alt,
  setCurrentIndex,
  vimeo,
  blurHash,
  firstSwipe,
}) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const videoRef = useRef();
  const buttonRef = useRef();

  const buttonAction = () => {};

  useEffect(() => {
    setCurrentIndex(swiper.activeIndex);
  });

  useEffect(() => {
    firstSwipe && swiper.slideNext();
  }, [firstSwipe]);

  // useEffect(() => {
  //   vimeo &&
  //     buttonRef.current.addEventListener("click", function () {
  //       videoRef.current.muted = false;
  //       videoRef.current.volume = 1;
  //     });
  // }, []);

  return (
    <>
      <div>
        {vimeo ? (
          <div
            className="vimeoWork"
            style={{ transform: "scale(95%)", cursor: "default" }}
            // onClick={
            //   swiperSlide.isNext
            //     ? () => swiper.slideNext()
            //     : () => swiper.slidePrev()
            // }
            onMouseEnter={
              swiperSlide.isActive || swiperSlide.isNext
                ? () => setMouseContent("unmute")
                : () => setMouseContent("←")
            }
            onMouseLeave={() => setMouseContent("")}
          >
            {/* <div ref={buttonRef} style={{ position: "fixed" }}>
              BUTTON
            </div> */}

            <div
              className="iframeOverlay"
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
            ></div>

            <iframe
              ref={videoRef}
              src={`https://player.vimeo.com/video/${vimeo}?muted=true&portait=false&title=false&autoplay=true&byline=false&color=000000`}
              width="auto"
              height="auto"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            ></iframe>
          </div>
        ) : (
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
            <Image
              fill
              objectFit="contain"
              src={url}
              alt={alt}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${url}&w=16&q=1`}
              style={{ transform: "scale(95%)" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SwiperImage;
