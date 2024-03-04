import "./assets/style/app.scss"

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "./Navbar";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Snake from "./pages/Snake";

const buttonsTheme = createTheme({
  palette: {
    primary: {
      main: "#B29758",
    },
  },
});

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <ThemeProvider theme={buttonsTheme}>
            <Home />
            <Experience />
            <Snake />
            <Contact />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
