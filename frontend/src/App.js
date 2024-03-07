import "./assets/style/app.scss"

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

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
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
        <div className="App">
          <ThemeProvider theme={buttonsTheme}>
              <Home />
              <Experience />
              <Snake />
              <Contact />
          </ThemeProvider>
        </div>
      </motion.div>
    </>
  );
}

export default App;
