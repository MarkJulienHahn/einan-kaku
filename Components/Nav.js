import React from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";

import { useRouter } from "next/router";

const Nav = ({ setClick }) => {
  const router = useRouter();

  const currentPage = { borderBottom: "2px solid black" };
  const otherPage = { color: "inherit" };

  return (
    <div className={styles.wrapper}>
      <Link
        style={router.pathname == "/about" ? currentPage : otherPage}
        href="/about"
      >
        Einan Kaku
      </Link>

      <div className={styles.menu}>
        {router.pathname == "/" ? (
          <span onClick={() => setClick("initial")} style={currentPage}>Work</span>
        ) : (
          <Link
            style={otherPage}
            href="/"
          >
            Work
          </Link>
        )}

        <Link
          style={router.pathname == "/books" ? currentPage : otherPage}
          href="/"
        >
          Books
        </Link>
        <a href="/">Instagram</a>
        <span className={styles.language}>中国人</span>
      </div>
    </div>
  );
};

export default Nav;
