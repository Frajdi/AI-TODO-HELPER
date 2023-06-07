import { useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ImageContainer from "./components/ImageContainer";
import SubTaskContent from "./SubTaskContent";
import SearchBar from "./components/searchSubComponents/SearchBar";
import useChatGPT from "../state/useChatGPT";

const SubtaskSlider = () => {

  const {handleUserInput, handleAiActivate, userInput} = useChatGPT()
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // TODO this two arrays will be passed as props but we leave here for now

  const subImages = [
    "https://wallpapercave.com/wp/wp4471392.jpg",
    "https://wallpaperaccess.com/full/7228853.jpg",
    "https://wallpapercave.com/wp/wp4471362.jpg",
    "https://wallpaperaccess.com/full/1138975.jpg",
    "https://wallpaper-house.com/data/out/8/wallpaper2you_248125.jpg",
  ];

  const subTasks = [
    "Hello there this is your first subtask",
    "Hello there this is your second subtask",
    "Hello there this is your third subtask",
    "Hello there this is your fourth subtask",
    "Hello there this is your fifth subtask",
  ];

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Stack direction="row" height={"60%"} width={"60%"} alignItems="flex-end">
        {subImages.map((item, index) => (
          <ImageContainer
            key={item}
            width={`${100 / subImages.length}%`}
            index={index + 1}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          >
            <img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "drop-shadow(1rem 1rem 1rem rgba(0, 0, 0, 1))",
                position: "absolute",
              }}
            />
            {hoveredIndex === index + 1 && (
              <SubTaskContent part={index + 1} content={subTasks[index]} />
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
      <SearchBar value={userInput} handleUserInput={handleUserInput} handleAiGenerate={handleAiActivate}/>
    </Stack>
  );
};

export default SubtaskSlider;
