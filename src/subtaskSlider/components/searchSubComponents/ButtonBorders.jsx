import React from "react";
import { motion } from "framer-motion";


const ButtonBorders = ({activateHoverState}) => {
  return (
    <>
      <motion.div
        style={{
          width: "100%",
          borderRight: "3px solid #90caf9",
          borderLeft: "3px solid #90caf9",
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
        variants={{
          normal: {
            height: "30%",
          },
          hovered: {
            height: "100%",
          },
        }}
        initial="normal"
        animate={activateHoverState}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      />
      <motion.div
        style={{
          width: "100%",
          borderRight: "3px solid #90caf9",
          borderLeft: "3px solid #90caf9",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        variants={{
          normal: {
            height: "30%",
          },
          hovered: {
            height: "100%",
          },
        }}
        initial="normal"
        animate={activateHoverState}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      />
      <motion.div
        style={{
          height: "100%",
          borderTop: "3px solid #90caf9",
          borderBottom: "3px solid #90caf9",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        variants={{
          normal: {
            width: "15%",
          },
          hovered: {
            width: "100%",
          },
        }}
        initial="normal"
        animate={activateHoverState}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      />
      <motion.div
        style={{
          height: "100%",
          borderTop: "3px solid #90caf9",
          borderBottom: "3px solid #90caf9",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
        variants={{
          normal: {
            width: "15%",
          },
          hovered: {
            width: "100%",
          },
        }}
        initial="normal"
        animate={activateHoverState}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
      />
    </>
  );
};

export default ButtonBorders;
