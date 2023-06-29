import client from "@/client";
import Head from "next/head";

import About from "../Components/About";
import { PortableText } from "@portabletext/react";

const Legals = ({ legals, showAbout, setShowAbout, about }) => {
  console.log(legals);
  return (
    <div>
      <Head>
        <title>Einan Kaku</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8" />
      </Head>

      <div className="aboutHeadBackground"></div>
      <div className="aboutHeadBackgroundBottom"></div>
      {showAbout && <About setShowAbout={setShowAbout} about={about} />}
      <div className="legalsWrapper">
        <PortableText value={legals[0].beschreibung} />
      </div>
    </div>
  );
};

export default Legals;

export async function getServerSideProps() {
  const legals = await client.fetch(`
    * [_type == "legals"]`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      legals,
      about,
    },
  };
}
