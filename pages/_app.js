import { useState } from "react";

import "@/styles/globals.css";
import Nav from "@/Components/Nav";

export default function App({ Component, pageProps }) {
  const [click, setClick] = useState("initial");
  const [mouseContent, setMouseContent] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [blocker, setBlocker] = useState(false);

  return (
    <>
      <Nav
        setClick={setClick}
        setShowAbout={setShowAbout}
        showAbout={showAbout}
        showContact={showContact}
        setShowContact={setShowContact}
        setBlocker={setBlocker}
      />
      <Component
        {...pageProps}
        click={click}
        setClick={setClick}
        mouseContent={mouseContent}
        setMouseContent={setMouseContent}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
        showContact={showContact}
        setShowContact={setShowContact}
        blocker={blocker}
        setBlocker={setBlocker}
      />
    </>
  );
}
