import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";

const ImageContainer = ({
  children,
  width,
  index,
  setHoveredIndex,
  hoveredIndex
}) => {
  const activateResize = useAnimation();

  useEffect(() => {
    if (hoveredIndex === index) {
      activateResize.start("expand");
    } else if (hoveredIndex === null) {
      activateResize.start("reduce");
    } else {
      activateResize.start("reduceSecondary");
    }
  }, [hoveredIndex]);
  

  const secondaryHeight = () => {
    const indexesFromHovered =  Math.abs(hoveredIndex - index)
    const height = `${100 - indexesFromHovered * 10}%`
    return height
  }

  return (
    <motion.div
      style = {{
         width: width,
         height: "100%", 
        }}
      variants = {{
        expand: {
            width: "70%",
            height: "100%",
            filter: 'brightness(100%)',
           },
        reduce: {
            height: "100%",
            width: width,
            filter: 'brightness(100%)',
        },
        reduceSecondary: {
            height: secondaryHeight(),
            width: width,
            filter: 'brightness(50%)',
          },
      }}
      onHoverStart = {() => setHoveredIndex(index)}
      onHoverEnd = {() => setHoveredIndex(null)}
      animate = {activateResize}
    >
      {children}
    </motion.div>
  );
};

export default ImageContainer;
