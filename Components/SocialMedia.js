import { useState } from "react";
import styles from "@/styles/Nav.module.css";

const SocialMedia = () => {
  const [active, setActive] = useState(false);
  return (
    <span className={styles.socialMedia}>
      <a onClick={() => setActive(!active)}>
        <span
          style={{ fontVariationSettings: active && `"ital" 100, "wght" 300` }}
          className={styles.socialMediaButton}
        >
          SocialMedia
        </span>
      </a>
      {active && (
        <div className={styles.options} onMouseLeave={() => setActive(false)}>
          <a
            href="https://www.instagram.com/einankaku/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/channel/UC9v60AkdkeiDQ9wsdvPrZCQ"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <a
            href="https://vimeo.com/user165389255"
            target="_blank"
            rel="noreferrer"
          >
            Vimeo
          </a>
        </div>
      )}
    </span>
  );
};

export default SocialMedia;
