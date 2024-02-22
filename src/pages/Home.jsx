import "../assets/style/home.scss";

import BackHandRoundedIcon from "@mui/icons-material/BackHandRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";

const Home = () => {
  const firstLinePartOne = "Hi";
  const firstLinePartTwo = "my name is";
  const myNameAndSurname = "Katarzyna Winkler";
  const secondLine = "and I do stuff for websites";

  return (
    <span data-section id="home">
      <span>
        <span className="first-line">
          <p>{firstLinePartOne}</p>
          <BackHandRoundedIcon />
          <p>{firstLinePartTwo}</p>
        </span>
        <span className="name">
          <p>{myNameAndSurname}</p>
        </span>
        <span className="second-line">
          <p>{secondLine}</p>
          <LaptopMacRoundedIcon />
        </span>
      </span>
    </span>
  );
};

export default Home;
