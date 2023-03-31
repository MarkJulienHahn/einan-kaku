import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Arbeit from "./Arbeit";

const ImagePreview = ({
  image,
  i,
  click,
  setClick,
  setOffset,
  setL,
  setW,
  setWorkInfo,
  setFocus,
  setCurrentIndex
}) => {
  const [hover, setHover] = useState(false);

  const ref = useRef();

  const aspectRatio = image?.titelbild.dimensions.aspectRatio;

  const hovered = { height: "12%", width: `${aspectRatio * 12}vh` };
  const regular = { height: "10%", width: `${aspectRatio * 10}vh` };
  const clicked = { height: "100vh", width: `${aspectRatio * 100}vh` };

  const makeActive = (number) => {
    setClick(number);
    setOffset(0);
    setCurrentIndex(i)
  };

  const makeFocus = async () => {
    setFocus(true);
  };

  const getL = () => {
    setL(ref.current.getBoundingClientRect().left);
  };

  const getW = () => {
    setW(ref.current.clientWidth);
  };

  useEffect(() => {
    click == i && setTimeout(() => getL(), 301);
    click == i && setTimeout(() => getW(), 301);
  }, [click == i]);

  useEffect(() => {
    click == i && setWorkInfo(image.werkangaben);
  });

  return (
    <>
      <div
        ref={ref}
        className="image"
        onMouseEnter={click != i ? () => setHover(true) : () => {}}
        onMouseLeave={() => setHover(false)}
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
              ? { opacity: "0.5" }
              : { opacity: "1" }
          }
          fill
          src={image.titelbild.url}
          alt={image.titelbild.originalFilename}
          // width={image.titelbild.dimensions.width}
          // height={image.titelbild.dimensions.height}
        />
      </div>
    </>
  );
};

export default ImagePreview;
