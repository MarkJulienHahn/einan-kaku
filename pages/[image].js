import React from "react";

import { useRouter } from "next/router";

import client from "@/client";
import Arbeit from "@/Components/Arbeit";
import ArbeitMobile from "@/Components/ArbeitMobile";
import MouseElement from "@/Components/MouseElement";

const ImagePage = ({ arbeit, mouseContent, setMouseContent }) => {
  const router = useRouter();

  const arbeitSingle = arbeit.filter(
    (single) => single.slug?.current == router.query.image
  );

  return (
    <>
      {" "}
      {mouseContent && <MouseElement mouseContent={mouseContent} />}
      <div className="desktop">
        <Arbeit
          image={arbeitSingle[0]}
          mouseContent={mouseContent}
          setMouseContent={setMouseContent}
        />
      </div>
      <div className="mobile">
        <ArbeitMobile
          image={arbeitSingle[0]}
          setMouseContent={setMouseContent}
        />
      </div>
    </>
  );
};

export default ImagePage;

export async function getServerSideProps() {
  const arbeit = await client.fetch(`
  * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash, originalFilename}}`);
  return {
    props: {
      arbeit,
    },
  };
}
