import React from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import useWindowDimensions from "@/Hooks/useWindowDimensions";

import { useRouter } from "next/router";

const Nav = ({ setClick }) => {
  const router = useRouter();
  const { windowWidth } = useWindowDimensions();

  const currentPage = {
    borderBottom: "2px solid var(--foreground)",
    cursor: "default",
  };
  const otherPage = { color: "inherit" };

  return (
    <div className={styles.wrapper}>
      {router.pathname == "/about" && windowWidth < 1000 ? (
        <Link href="/">Back</Link>
      ) : (
        <Link
          style={router.pathname == "/about" ? currentPage : otherPage}
          href="/about"
        >
          Einan Kaku
        </Link>
      )}

      {router.pathname != "/about" || windowWidth > 1000 ? (
        <div className={styles.menu}>
          {router.pathname == "/" ? (
            <span onClick={() => setClick("initial")}>
              <a style={currentPage}>Work</a>
            </span>
          ) : (
            <Link style={otherPage} href="/">
              Work
            </Link>
          )}

          {router.pathname == "/books" ? (
            <span onClick={() => setClick("initial")}>
              <a style={currentPage}>Books</a>
            </span>
          ) : (
            <Link style={otherPage} href="/books">
              Books
            </Link>
          )}
            
          <a
            href="https://www.instagram.com/einankaku/?hl=de"
            target="blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          {/* <span className={styles.language}>中国人</span> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
