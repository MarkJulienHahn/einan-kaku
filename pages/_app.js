import { useState } from "react";

import "@/styles/globals.css";
import Nav from "@/Components/Nav";

export default function App({ Component, pageProps }) {
  const [click, setClick] = useState("initial");
  const [mouseContent, setMouseContent] = useState("");
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <Nav setClick={setClick} setShowAbout={setShowAbout} showAbout={showAbout}/>
      <Component
        {...pageProps}
        click={click}
        setClick={setClick}
        mouseContent={mouseContent}
        setMouseContent={setMouseContent}
        showAbout={showAbout}
      />
    </>
  );
}
