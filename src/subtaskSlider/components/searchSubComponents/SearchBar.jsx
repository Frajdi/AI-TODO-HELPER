import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import ButtonBorders from "./ButtonBorders";
import { useAnimation } from "framer-motion";

const SearchBar = ({ handleSearch, value }) => {

  const activateHoverState = useAnimation();

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "35%",
        position: "absolute",
        bottom: "10%",
        border: "1px solid #90caf9",
        filter: "drop-shadow(0 1rem 0.5rem rgba(0, 0, 0, 1))"
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 , fontFamily: "Bruno Ace SC", fontSize: 18}}
        onChange={handleSearch}
        placeholder="Enter your task here"
        value={value}
      />
          <Button
            size="large"
            disabled={value === ""}
            sx={{
              backgroundColor: value === "" ? "black" : null,
              m: '10px',
              fontFamily: "Bruno Ace SC"
            }}
            onMouseEnter={() => activateHoverState.start("hovered")}
            onMouseLeave={() => activateHoverState.start("normal")}
          >
            <ButtonBorders activateHoverState = {activateHoverState}/>
            Generate AI
          </Button>
    </Paper>
  );
};

export default SearchBar;
