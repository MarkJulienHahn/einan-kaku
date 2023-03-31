import { useState } from "react";

import "@/styles/globals.css";
import Nav from "@/Components/Nav";

export default function App({ Component, pageProps }) {
  const [click, setClick] = useState("initial");
  return (
    <>
      <Nav setClick={setClick} />
      <Component {...pageProps} click={click} setClick={setClick} />
    </>
  );
}
