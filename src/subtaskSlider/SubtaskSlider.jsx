import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ImageContainer from "./components/ImageContainer";
import SubTaskContent from "./SubTaskContent";
import SearchBar from "./components/searchSubComponents/SearchBar";
import useChatGPT from "../state/useChatGPT";
import { subTasks, subImages } from "./components/data";
import ProgressiveImg from "./components/ProgresiveImage";

const SubtaskSlider = () => {
  const {
    handleUserInput,
    handleAiActivate,
    aiResponse,
    aiImages,
    loading : isLoading,
    userInput,
  } = useChatGPT();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [images, setImages] = useState(subImages);

  useEffect(() => {
    if (!isLoading && aiImages) {
      console.log(aiImages);
      setImages(aiImages);
    }
  }, [aiImages, isLoading]);

// const isLoading = true

  useEffect(() => {
    let intervalId;

    if (isLoading) {
      intervalId = setInterval(() => {
        setHoveredIndex((prevHoveredIndex) => {
          if(prevHoveredIndex !== null && prevHoveredIndex < images.length) {
              return prevHoveredIndex + 1
          }  
          else if(prevHoveredIndex === null || prevHoveredIndex === images.length) {
            return 1
          }
        });
      }, 450);
    }

    return () => {
      clearInterval(intervalId);
      setHoveredIndex(null)
    };
  }, [isLoading]);


  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Stack direction="row" height={"60%"} width={"60%"} alignItems="flex-end">
        {images.map((item, index) => (
          <ImageContainer
            key={item.url}
            width={`${100 / subImages.length}%`}
            index={index + 1}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            isLoading={isLoading}
          >
            <ProgressiveImg  src={item.url === subImages[index].url ? null : item.url} placeholderSrc={subImages[index].url}/>
            {/* <img src={item.url} /> */}
            {hoveredIndex === index + 1 && !isLoading && (
              <SubTaskContent
                part={index + 1}
                content={aiResponse ? aiResponse[index] : subTasks[index]}
              />
            )}
          </ImageContainer>
        ))}
        <Box
          justifyContent="center"
          sx={{
            width: "60%",
            position: "absolute",
            top: "20%",
          }}
        >
          <Typography
            fontFamily={"Bruno Ace SC"}
            width={"fit-content"}
            margin={"0 auto"}
            fontSize={40}
            sx={{ filter: "drop-shadow(0 1rem 0.3rem rgba(0, 0, 0, 1))" }}
          >
            {!isLoading ? userInput: 'Loading ...'}
          </Typography>
        </Box>
      </Stack>
      <SearchBar
        value={userInput}
        handleUserInput={handleUserInput}
        handleAiGenerate={handleAiActivate}
      />
    </Stack>
  );
};

export default SubtaskSlider;
