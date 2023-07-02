import { useState, useEffect } from "react";

const ProgressiveImg = ({
  placeholderSrc,
  src,
  isLastElement,
  setLoading
}) => {

  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      // if(isLastElement){
      //   setLoading(false)
      // }
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "drop-shadow(1rem 1rem 1rem rgba(0, 0, 0, 1))"
      }}
    />
  );
};
export default ProgressiveImg;