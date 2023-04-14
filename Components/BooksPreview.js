import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const BooksPreview = ({
  image,
  i,
  click,
  setClick,
  setOffset,
  setL,
  setW,
  setWorkInfo,
  setMouseContent,
  setFocus,
}) => {
  const [hover, setHover] = useState(false);
  const ref = useRef();
  const aspectRatio = image?.titelbild.dimensions.aspectRatio;

  const hovered = { height: "14%", width: `${aspectRatio * 14}vh` };
  const regular = { height: "12%", width: `${aspectRatio * 12}vh` };
  const clicked = {
    height: "70vh",
    width: `${aspectRatio * 70}vh`,
    cursor: "none",
  };

  const makeActive = (number) => {
    setClick(number);
    setOffset(0);
  };
  const makeFocus = async () => {
    setFocus(i);
  };
  const getL = () => {
    setL(ref.current.getBoundingClientRect().left);
  };

  const getW = () => {
    setW(ref.current.clientWidth);
  };

  useEffect(() => {
    setMouseContent(`Click to Play`);
    click == i && setTimeout(() => getL(), 301);
    click == i && setTimeout(() => getW(), 301);
  }, [click == i]);

  useEffect(() => {
    click == i && setWorkInfo(image.werkangaben);
  });

  // console.log(image)

  return (
    <>
      <div
        ref={ref}
        className="image"
        onMouseEnter={
          click != i
            ? () => {
                setHover(true), setWorkInfo(image.werkangaben);
              }
            : () => setMouseContent(`Click to Play`)
        }
        onMouseLeave={
          click != i
            ? () => {
                setWorkInfo(), setHover(false);
              }
            : () => setMouseContent(null)
        }
        onClick={
          click != i
            ? () => {
                makeActive(i), setHover(false);
              }
            : makeFocus
        }
        style={
          hover && click == "initial" ? hovered : click == i ? clicked : regular
        }
      >
        <Image
          style={
            click != i && click != "initial"
              ? { opacity: "0.2" }
              : { opacity: "1" }
          }
          fill
          src={image.titelbild.url}
          alt={image.titelbild.originalFilename}
        />
      </div>
    </>
  );
};

export default BooksPreview;
