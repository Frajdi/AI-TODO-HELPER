import { useState, useEffect } from "react";

const ProgressiveImg = ({ placeholderSrc, src }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "drop-shadow(1rem 1rem 1rem rgba(0, 0, 0, 1))",
        position: "absolute",
        borderRadius: '15px'
      }}
    />
  );
};
export default ProgressiveImg;