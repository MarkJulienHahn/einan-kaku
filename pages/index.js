import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { use100vh } from "react-div-100vh";
import useWindowDimensions from "@/Hooks/useWindowDimensions";
import ImagePreview from "@/Components/ImagePreview";
import client from "@/client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRouter } from "next/router";

import About from "../Components/About";
import Arbeit from "../Components/Arbeit";
import ArbeitMobile from "../Components/ArbeitMobile";
import MouseElement from "../Components/MouseElement";
import ImagePreviewMobile from "@/Components/ImagePreviewMobile";
import Contact from "@/Components/Contact";

const Index = ({
  click,
  setClick,
  arbeiten,
  about,
  mouseContent,
  setMouseContent,
  showAbout,
  setShowAbout,
  showContact,
  blocker,
  setBlocker,
}) => {
  const { windowWidth } = useWindowDimensions();

  const router = useRouter();
  const ref = useRef();
  const vh = use100vh();

  const [x, setX] = useState();

  const [offset, setOffset] = useState(0);
  const [L, setL] = useState(null);
  const [W, setW] = useState(null);

  const [difference, setDifference] = useState(null);

  const [workInfo, setWorkInfo] = useState("");

  const M = windowWidth / 2;

  const closeAction = async () => {
    setClick("pause"), setX(0), setClick("initial");
  };

  useEffect(() => {
    setOffset(M - (L + W / 2));
  }, [L]);

  useEffect(() => {
    setClick("initial"), setOffset(0);
  }, []);

  useEffect(() => {
    const update = (e) => {
      setX((e.x - windowWidth / 2) / difference);
    };
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  });

  useEffect(() => {
    if (ref.current?.clientWidth - windowWidth < 0) setDifference(0);
    if (
      ref.current?.clientWidth - windowWidth > 0 &&
      ref.current?.clientWidth - windowWidth < 300
    )
      setDifference(4);
    if (
      ref.current?.clientWidth - windowWidth > 300 &&
      ref.current?.clientWidth - windowWidth < 600
    )
      setDifference(2);
    if (
      ref.current?.clientWidth - windowWidth > 600 &&
      ref.current?.clientWidth - windowWidth < 700
    )
      setDifference(2);
    if (
      ref.current?.clientWidth - windowWidth > 700 &&
      ref.current?.clientWidth - windowWidth < 1000
    )
      setDifference(1.5);
    if (
      ref.current?.clientWidth - windowWidth > 1000 &&
      ref.current?.clientWidth - windowWidth < 1200
    )
      setDifference(1);
    if (ref.current?.clientWidth - windowWidth > 1200) setDifference(0.5);
    if (click == "initial") setOffset(0), setMouseContent(null);
    if (blocker) setX(0);
  });

  return (
    <>
      <Head>
        <title>Einan Kaku - Stuttgart-Based Contemporary Artist</title>
        <meta name="description" content="Explore the works of Einan Kaku, a contemporary artist based in Stuttgart, specializing in digital and physical installations." />
        <meta name="keywords" content="Einan Kaku, Stuttgart artist, contemporary art, digital installations, physical art, artwork gallery, modern art, creative projects" />
        <meta property="og:title" content="Einan Kaku - Stuttgart-Based Contemporary Artist" />
        <meta property="og:description" content="Visit Einan Kaku's official website to view digital and physical installations from a renowned contemporary artist based in Stuttgart." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>

      {mouseContent && <MouseElement mouseContent={mouseContent} />}
      {showAbout && <About setShowAbout={setShowAbout} about={about} />}
      {showContact && <Contact />}

      {router.query?.image &&
        (windowWidth > 1000 ? (
          <Arbeit
            image={arbeiten[router.query.image]}
            mouseContent={mouseContent}
            setMouseContent={setMouseContent}
          />
        ) : (
          <ArbeitMobile
            image={arbeiten[router.query.image]}
            mouseContent={mouseContent}
            setMouseContent={setMouseContent}
          />
        ))}

      {click != "initial" && (
        <div className="workCloseButton" onClick={closeAction}>
          close
        </div>
      )}
      <div className="workOuter">
        {workInfo && (
          <ul className="workInfo">
            <li>»{workInfo.titel}«</li>
            <li>{workInfo.untertitel}</li>
          </ul>
        )}

        {click == "initial" && (
          <div
            className="blocker"
            onMouseEnter={() => setBlocker(true)}
            onMouseLeave={() => setBlocker(false)}
          ></div>
        )}

        <div
          style={
            click == "initial" && !blocker
              ? {
                  height: vh,
                  transform: `translateX(${offset - x}px)`,
                }
              : { height: vh, transform: `translateX(${offset}px)` }
          }
          className="workWrapper"
          ref={ref}
        >
          {arbeiten.map((image, i) => (
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
            {arbeiten.map((image, i) => (
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
  const arbeiten = await client.fetch(`
    * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash, originalFilename}}`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      arbeiten,
      about,
    },
  };
}
