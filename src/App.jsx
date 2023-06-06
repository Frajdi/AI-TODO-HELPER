import SubtaskSlider from "./subtaskSlider/SubtaskSlider";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#292929'
    }
  },
});

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SubtaskSlider />
      </ThemeProvider>
    </>
  )
}

export default App
