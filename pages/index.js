import { useState, useEffect } from "react";
import Head from "next/head";
import { use100vh } from "react-div-100vh";
import useWindowDimensions from "@/Hooks/useWindowDimensions";
import ImagePreview from "@/Components/ImagePreview";
import client from "@/client";

import Arbeit from "../Components/Arbeit";

import image01 from "@/public/images/01.jpg";
import image02 from "@/public/images/03.jpg";
import image03 from "@/public/images/05.jpg";
import image04 from "@/public/images/08.jpg";
import image05 from "@/public/images/16.jpg";
import image06 from "@/public/images/17.jpg";
import image07 from "@/public/images/20.jpg";
import image08 from "@/public/images/25.jpg";
import image09 from "@/public/images/28.jpg";
import image10 from "@/public/images/34.jpg";
import image11 from "@/public/images/44.jpg";

const images = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
];

export default function Home({ click, setClick, arbeit }) {
  const { windowWidth } = useWindowDimensions();

  const [offset, setOffset] = useState(0);
  const vh = use100vh();
  const [L, setL] = useState(null);
  const [W, setW] = useState(null);

  const [focus, setFocus] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [workInfo, setWorkInfo] = useState("");

  const [mouseContent, setMouseContent] = useState("");

  const M = windowWidth / 2;

  useEffect(() => {
    if (click == "initial") setOffset(0), setCurrentIndex(null);
  });

  useEffect(() => {
    setOffset(M - (L + W / 2));
  }, [L]);

  return (
    <>
      <Head>
        <title>Einan Kaku</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {focus && (
        <Arbeit
          image={arbeit[currentIndex]}
          setFocus={setFocus}
          mouseContent={mouseContent}
          setMouseContent={setMouseContent}
        />
      )}

      <div className="workOuter">
        {click != "initial" && (
          <ul className="workInfo">
            <li>"{workInfo.titel}"</li>
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
              image={image}
              i={i}
              click={click}
              setClick={setClick}
              setOffset={setOffset}
              setL={setL}
              setW={setW}
              setWorkInfo={setWorkInfo}
              setFocus={setFocus}
              setCurrentIndex={setCurrentIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const arbeit = await client.fetch(`
  * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}`);
  return {
    props: {
      arbeit,
    },
  };
}
