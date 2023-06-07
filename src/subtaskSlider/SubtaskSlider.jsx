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
    loading,
    userInput,
  } = useChatGPT();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [images, setImages] = useState(subImages);

  useEffect(() => {
    if (loading && aiImages) {
      setImages(aiImages);
    }
  }, [aiImages]);


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
          >
            <ProgressiveImg  src={item.url === subImages[index].url ? null : item.url} placeholderSrc={subImages[index].url}/>
            {hoveredIndex === index + 1 && (
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
            {userInput}
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
