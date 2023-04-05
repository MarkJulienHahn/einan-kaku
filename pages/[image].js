import React from "react";

import { useRouter } from "next/router";
import useWindowDimensions from "@/Hooks/useWindowDimensions";

import client from "@/client";
import Arbeit from "@/Components/Arbeit";
import ArbeitMobile from "@/Components/ArbeitMobile";

const ImagePage = ({ arbeit, mouseContent, setMouseContent }) => {
  const router = useRouter();
  const { windowWidth } = useWindowDimensions();

  const arbeitSingle = arbeit.filter(
    (single) => single.slug?.current == router.query.image
  );

  return (
    <>
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
    * [_type == "arbeiten"]|order(orderRank){..., "arbeiten": arbeiten[]{..., "bild": bild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}, "titelbild": titelbild.asset->{url, "dimensions": metadata.dimensions, originalFilename}}`);
  return {
    props: {
      arbeit,
    },
  };
}
