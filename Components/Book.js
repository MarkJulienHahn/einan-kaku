import { useState } from "react";
import { use100vh } from "react-div-100vh";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SwiperImage from "./SwiperImage";
import MouseElement from "./MouseElement";

const Book = ({ book, mouseContent, setMouseContent, setFocus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const vh = use100vh();

  return (
    <div className="vimeoWrapper" style={{ height: vh }}>
      {currentIndex == 0 && (
        <ul className="workInfo">
          <li>»{book.werkangaben?.titel}«</li>
          <li>
            {book.werkangaben?.jahr} / {book.werkangaben?.medium} /{" "}
            {book.werkangaben?.dimensionen}
          </li>
        </ul>
      )}

      <MouseElement mouseContent={mouseContent} />

      {book.video ? (
        <div className="arbeitWrapperVimeo">
          <span className="close" onClick={() => setFocus(null)}>
            ← Back
          </span>
          <div className="vimeoInner">
            <iframe
              src={`https://player.vimeo.com/video/${book.vimeoLink}?background=1&muted=1`}
              width="auto"
              height="auto"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="arbeitWrapper">
          <span className="close" onClick={() => setFocus(null)}>
            ← Back
          </span>
          <Swiper
            slidesPerView={1.8}
            centeredSlides={true}
            spaceBetween={30}
            rewind={true}
          >
            <SwiperSlide>
              <SwiperImage
                url={book.titelbild.url}
                alt={book.titelbild.originalFilename}
                setMouseContent={setMouseContent}
                setCurrentIndex={setCurrentIndex}
                blurHash={book.titelbild.blurHash}
                // firstSwipe={firstSwipe}
              />
            </SwiperSlide>

            {book.bilder.map((bild, i) => (
              <SwiperSlide key={i}>
                <SwiperImage
                  url={bild.url}
                  alt={bild.originalFilename}
                  setMouseContent={setMouseContent}
                  setCurrentIndex={setCurrentIndex}
                  blurHash={bild.blurHash}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Book;
