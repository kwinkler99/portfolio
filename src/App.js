import "./assets/style/app.scss"

import Navbar from "./Navbar";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Snake from "./pages/Snake";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Home />
        <Experience />
        <Snake />
        <Contact />
      </div>
    </>
  );
}

export default App;
