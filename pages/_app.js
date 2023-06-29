import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import "@/styles/globals.css";
import Nav from "@/Components/Nav";
import Cookie from "@/Components/Cookie";

export default function App({ Component, pageProps }) {
  const [click, setClick] = useState("initial");
  const [mouseContent, setMouseContent] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [blocker, setBlocker] = useState(false);
  const [cookieSeen, setCookieSeen] = useState();

  const router = useRouter()

  const onAccept = () => {
    setCookieSeen(true), localStorage.setItem("cookieSeen", "true");
  };

  const onDecline = () => {
    setCookieSeen(true), localStorage.setItem("cookieSeen", "true");
  };

  useEffect(() => {
    const data = localStorage.getItem("cookieSeen");
    if (data) {
      setCookieSeen(data);
    }
  }, []);

  useEffect(() => {
    router.pathname && setShowAbout(false);
  }, [router.pathname]);

  return (
    <>
      {cookieSeen == undefined ? (
        <div className="cookieWrapper">
          <Cookie onAccept={onAccept} onDecline={onDecline} />
        </div>
      ) : (
        ""
      )}
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
