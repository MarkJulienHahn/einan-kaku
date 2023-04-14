import { useState, useEffect } from "react";
import Head from "next/head";

import { use100vh } from "react-div-100vh";
import useWindowDimensions from "@/Hooks/useWindowDimensions";

import client from "@/client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Book from "../Components/Book";
import MouseElement from "../Components/MouseElement";
import BooksPreview from "@/Components/BooksPreview";
import BooksPreviewMobile from "@/Components/BooksPreviewMobile";
import About from "@/Components/About"

const Books = ({
  click,
  setClick,
  books,
  about,
  mouseContent,
  setMouseContent,
  showAbout,
}) => {
  const { windowWidth } = useWindowDimensions();

  const height = use100vh();

  const [offset, setOffset] = useState(0);
  const vh = use100vh();
  const [L, setL] = useState(null);
  const [W, setW] = useState(null);

  const [workInfo, setWorkInfo] = useState("");
  const [focus, setFocus] = useState(null);

  const M = windowWidth / 2;

  useEffect(() => {
    setOffset(M - (L + W / 2));
  }, [L]);

  useEffect(() => {
    setClick("initial"), setOffset(0);
  }, []);

  useEffect(() => {
    if (click == "initial") setOffset(0), setMouseContent(null);
  });

  console.log(books)

  return (
    <>
      <Head>
        <title>Einan Kaku</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {mouseContent && <MouseElement mouseContent={mouseContent} />}

      {showAbout && <About about={about} />}

      {focus != null && (
        <Book
          book={books[focus]}
          mouseContent={mouseContent}
          setMouseContent={setMouseContent}
          setFocus={setFocus}
        />
      )}

      <div className="workOuter">
        {workInfo && (
          <ul className="workInfo">
            <li>»{workInfo.titel}«</li>
            <li>{workInfo.untertitel}</li>
          </ul>
        )}

        <div
          style={{
            height: vh,
            transform: `translateX(${offset}px)`,
          }}
          className="workWrapper"
        >
          {books.map((image, i) => (
            <BooksPreview
              key={i}
              image={image}
              i={i}
              click={click}
              setClick={setClick}
              setOffset={setOffset}
              setL={setL}
              setW={setW}
              setWorkInfo={setWorkInfo}
              setMouseContent={setMouseContent}
              setFocus={setFocus}
            />
          ))}
        </div>
        <div style={{ height: height }} className="workWrapperMobile">
          <Swiper slidesPerView={1.6} centeredSlides={true} spaceBetween={40}>
            {books.map((image, i) => (
              <SwiperSlide key={i}>
                <BooksPreviewMobile image={image} i={i} setFocus={setFocus} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Books;

export async function getServerSideProps() {
  const books = await client.fetch(`
  * [_type == "books"]|order(orderRank){..., "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      books,
      about,
    },
  };
}
