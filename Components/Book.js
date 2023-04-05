import { useState } from "react";
import { use100vh } from "react-div-100vh";
import MouseElement from "./MouseElement";

const Book = ({ book, mouseContent, setMouseContent, setFocus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const vh = use100vh();

  return (
    <div className="vimeoWrapper" style={{ height: vh }}>
      {currentIndex == 0 && (
        <ul className="workInfo">
          <li>»{book.werkangaben.titel}« </li>
          <li>
            {book.werkangaben.jahr} / {book.werkangaben.medium} /{" "}
            {book.werkangaben.dimensionen}
          </li>
        </ul>
      )}

      <span className="close" onClick={() => setFocus(null)}>
        ← Back
      </span>

      <MouseElement mouseContent={mouseContent} />
      <div className="vimeoInner">
        <iframe
          src={`https://player.vimeo.com/video/${book.vimeoLink}?background=1&muted=1`}
          width="auto"
          height="auto"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Book;
