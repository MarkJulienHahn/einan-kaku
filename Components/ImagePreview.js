import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

const ImagePreview = ({
  image,
  i,
  click,
  setClick,
  setOffset,
  setL,
  setW,
  setWorkInfo,
  setMouseContent,
}) => {
  const [hover, setHover] = useState(false);

  const ref = useRef();

  const router = useRouter();

  const aspectRatio = image?.titelbild.dimensions.aspectRatio;

  const hovered = aspectRatio < 1.05 ? { height: "15%", width: `${aspectRatio * 15}vh` } : { height: "12%", width: `${aspectRatio * 12}vh` };
  const regular = aspectRatio < 1.05 ? { height: "13%", width: `${aspectRatio * 13}vh` } : { height: "10%", width: `${aspectRatio * 10}vh` };
  const clicked = {
    height: "100vh",
    width: `${aspectRatio * 100}vh`,
    cursor: "none",
  };

  const makeActive = (number) => {
    setClick(number);
    setOffset(0);
  };

  const makeFocus = async () => {
    router.push(`/?image=${i}`, `/${image.slug?.current}`);
  };

  const getL = () => {
    setL(ref.current.getBoundingClientRect().left);
  };

  const getW = () => {
    setW(ref.current.clientWidth);
  };

  useEffect(() => {
    setMouseContent(`Click to Enter`);
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
        onMouseEnter={
          click != i
            ? () => {
                setHover(true), setWorkInfo(image.werkangaben);
              }
            : () => setMouseContent(`Click to Enter`)
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
          placeholder="blur"
          blurDataURL={image.titelbild.blurHash}
        />
      </div>
    </>
  );
};

export default ImagePreview;
