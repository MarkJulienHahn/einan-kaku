import React from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import useWindowDimensions from "@/Hooks/useWindowDimensions";

import { useRouter } from "next/router";

const Nav = ({
  setClick,
  showAbout,
  setShowAbout,
  setBlocker
}) => {
  const router = useRouter();
  const { windowWidth } = useWindowDimensions();

  const currentPage = {
    fontVariationSettings: `"wght" 300, "ital" 100`,
    cursor: "default",
  };
  const otherPage = { color: "inherit" };

  return (
    <div className={styles.wrapper} onMouseEnter={() => setBlocker(true)}>
      <div
        onClick={() => setShowAbout(!showAbout)}
        style={{ cursor: "pointer" }}
      >
        <a>Einan Kaku</a>
      </div>
      {/* {router.pathname == "/about" && windowWidth < 1000 ? (
        <Link href="/">Back</Link>
      ) : (
        <Link
          style={router.pathname == "/about" ? currentPage : otherPage}
          href="/about"
        >
          Einan Kaku
        </Link>
      )} */}

      {router.pathname != "/about" || windowWidth > 1000 ? (
        <div className={styles.menu}>
          {router.pathname == "/" ? (
            <span
              onClick={() => {
                setClick("initial"), setShowAbout(false);
              }}
            >
              <a style={currentPage}>Works</a>
            </span>
          ) : (
            <Link style={otherPage} href="/">
              <span
                onClick={() => {
                  setShowAbout(false);
                }}
              >
                Works
              </span>
            </Link>
          )}

          {router.pathname == "/books" ? (
            <span
              onClick={() => {
                setClick("initial"), setShowAbout(false);
              }}
            >
              <a style={currentPage}>Books</a>
            </span>
          ) : (
            <Link style={otherPage} href="/books">
              <span
                onClick={() => {
                  setShowAbout(false);
                }}
              >
                Books
              </span>
            </Link>
          )}

          {router.pathname == "/exhibitions" ? (
            <span
              onClick={() => {
                setClick("initial"), setShowAbout(false);
              }}
            >
              <a style={currentPage}>Exhibitions</a>
            </span>
          ) : (
            <Link style={otherPage} href="/exhibitions">
              <span
                onClick={() => {
                  setShowAbout(false);
                }}
              >
                Exhibitions
              </span>
            </Link>
          )}

          <a
            href="https://www.instagram.com/einankaku/?hl=de"
            target="blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          {router.pathname == "/contact" ? (
            <span
              onClick={() => {
                setClick("initial"), setShowAbout(false);
              }}
            >
              <a style={currentPage}>Contact</a>
            </span>
          ) : (
            <Link style={otherPage} href="/contact">
              <span
                onClick={() => {
                  setShowAbout(false);
                }}
              >
                Contact
              </span>
            </Link>
          )}

          {/* <span
            style={showContact ? currentPage : null}
            onClick={() => setShowContact(!showContact)}
          >
            Contact
          </span>
          <span className={styles.language}>中国人</span> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
