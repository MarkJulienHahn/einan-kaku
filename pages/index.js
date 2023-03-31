import react, { useState, useEffect } from "react";
import Head from "next/head";
import { use100vh } from "react-div-100vh";
import useWindowDimensions from "@/Hooks/useWindowDimensions";
import ImagePreview from "@/Components/ImagePreview";
import client from "@/client";

import Arbeit from "../Components/Arbeit";

const Index = ({ click, setClick, arbeit }) => {
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
    setOffset(M - (L + W / 2));
  }, [L]);

  // useEffect(() => {
  //   setClick("inital"), setOffset(0)
  // }, [])

  useEffect(() => {
    if (click == "initial") setOffset(0), setCurrentIndex(null);
  });

  console.log(offset)

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
                setFocus={setFocus}
                setCurrentIndex={setCurrentIndex}
              />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const arbeit = await client.fetch(`
  * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}`);
  return {
    props: {
      arbeit,
    },
  };
}
