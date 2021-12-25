import React from "react";
import Lottie from "react-lottie";
import animationData from "./facial-recognition.json";

function FacialRecAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      style={{ margin: -65 }}
      height={185}
      width={300}
    />
  );
}

export default FacialRecAnimation;
