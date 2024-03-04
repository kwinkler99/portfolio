import "../assets/style/snake.scss";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { reset } from "../reducers/movement";
import Board from "./Snake/Board";

import { Button } from "@mui/material";

const Snake = () => {
  const dispatch = useDispatch();
  const [startGame, setStartGame] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const bite = useSelector((state) => state.position.bite);

  const Start = () => (
    <Button
      onClick={() => {
        setStartGame(true);
        dispatch(reset());
      }}
      color="primary"
      variant="contained"
    >
      Start
    </Button>
  );

  const Stop = () => (
    <Button
      onClick={() => setStopGame(true)}
      color="primary"
      variant="contained"
    >
      Stop
    </Button>
  );

  const Resume = () => (
    <Button
      onClick={() => setStopGame(false)}
      color="primary"
      variant="contained"
    >
      Resume
    </Button>
  );

  return (
    <span data-section id="snake">
      <div className="container">
        <div className="board">
          <Board startGame={startGame} stopGame={stopGame} />
        </div>
        <div className="buttons">
          {!bite && (
            <>{!startGame ? <Start /> : !stopGame ? <Stop /> : <Resume />}</>
          )}
        </div>
      </div>
    </span>
  );
};

export default Snake;
