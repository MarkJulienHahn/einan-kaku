import React from "react";
import client from "@/client";

import About from "../Components/About";

const exhibitions = ({ showAbout, setShowAbout, exhibitions, about }) => {
  return (
    <>
      {showAbout && <About setShowAbout={setShowAbout} about={about} />}
      <div className="exhibitionsWrapper">
        {exhibitions.map((ex, i) => (
          <div key={i} className="exhibitionInner">
            <div className="italic">{ex.date}</div>
            <a href={ex.link}>{ex.name}</a>, {ex.location} &#8599;
          </div>
        ))}
      </div>
    </>
  );
};

export default exhibitions;

export async function getServerSideProps() {
  const exhibitions = await client.fetch(`
      * [_type == "exhibitions"]|order(orderRank){...}`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      exhibitions,
      about,
    },
  };
}
