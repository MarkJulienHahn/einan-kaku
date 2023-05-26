import React from "react";

import client from "@/client";

import About from "../Components/About";
import Contact from "@/Components/Contact";

const contact = ({ showAbout, setShowAbout, about }) => {
  return (
    <>
      {showAbout && <About setShowAbout={setShowAbout} about={about} />}
      <Contact contact={about[0].contact}/>
    </>
  );
};

export default contact;

export async function getServerSideProps() {
    const about = await client.fetch(`
    * [_type == "about"]`);
    return {
      props: {
        about,
      },
    };
  }