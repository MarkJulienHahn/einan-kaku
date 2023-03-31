import { useState, useEffect } from "react";

const MouseElement = ({mouseContent}) => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  console.log(mouseContent)

  const mouseElement = {
    position: "fixed",
    top: y,
    left: x,
    zIndex: 1000,
    pointerEvents: "none"
    // visibility: props.lable ? "visible" : "hidden",
    // background: props.background ? props.background : "var(--tertiary)"
  };

  return <div style={mouseElement}>{mouseContent}</div>;
};

export default MouseElement;
