import { useState, useEffect } from "react";
import Head from "next/head";
import { use100vh } from "react-div-100vh";
import useWindowDimensions from "@/Hooks/useWindowDimensions";
import ImagePreview from "@/Components/ImagePreview";
import client from "@/client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRouter } from "next/router";

import Arbeit from "../Components/Arbeit";
import ArbeitMobile from "../Components/ArbeitMobile";
import MouseElement from "../Components/MouseElement";
import ImagePreviewMobile from "@/Components/ImagePreviewMobile";

const Index = ({ click, setClick, arbeit, mouseContent, setMouseContent }) => {
  const { windowWidth } = useWindowDimensions();

  const router = useRouter();

  const vh = use100vh();

  const [offset, setOffset] = useState(0);
  const [L, setL] = useState(null);
  const [W, setW] = useState(null);

  const [workInfo, setWorkInfo] = useState("");

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

  return (
    <>
      <Head>
        <title>Einan Kaku</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {mouseContent && <MouseElement mouseContent={mouseContent} />}

      {router.query.image &&
        (windowWidth > 1000 ? (
          <Arbeit
            image={arbeit[router.query.image]}
            mouseContent={mouseContent}
            setMouseContent={setMouseContent}
          />
        ) : (
          <ArbeitMobile
            image={arbeit[router.query.image]}
            mouseContent={mouseContent}
            setMouseContent={setMouseContent}
          />
        ))}

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
          {arbeit.map((image, i) => (
            <ImagePreview
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
            />
          ))}
        </div>
        <div style={{ height: vh }} className="workWrapperMobile">
          <Swiper slidesPerView={1.6} centeredSlides={true} spaceBetween={40}>
            {arbeit.map((image, i) => (
              <SwiperSlide key={i}>
                <ImagePreviewMobile image={image} i={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const arbeit = await client.fetch(`
    * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash, originalFilename}}`);
  return {
    props: {
      arbeit,
    },
  };
}
