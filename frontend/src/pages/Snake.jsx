import "../assets/style/snake.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { reset, resetPoints } from "../reducers/movement";
import Board from "./Snake/Board";

import { Box, Modal, Typography, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import ResultGraph from "./Snake/ResultGraph";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--gold)",
  color: "var(--modal-text)",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const Snake = () => {
  const dispatch = useDispatch();
  const [openStart, setOpenStart] = useState(false);
  const [openScore, setOpenScore] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const bite = useSelector((state) => state.position.bite);

  const closeStartModal = () => {
    setOpenStart(false);
  };

  const closeScoreModal = () => {
    dispatch(reset());
    setStopGame(false);
    setStartGame(false);
    setOpenScore(false);
  };

  useEffect(() => {
    if (bite) {
      setOpenScore(true);
    }
  }, [bite]);

  const Start = () => (
    <Button
      onClick={() => {
        setStartGame(true);
        setOpenStart(true);
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

  const Reset = () =>
    startGame && (
      <Button
        onClick={() => {
          setOpenScore(true);
        }}
        color="primary"
        variant="contained"
      >
        Reset
      </Button>
    );

  const Result = () => (
    <Button
      onClick={() => {
        setOpenResult(true);
      }}
      color="primary"
      variant="contained"
    >
      Result
    </Button>
  );

  const Play = () => (
    <Button
      onClick={() => {
        setOpenResult(false);
      }}
      color="primary"
      variant="contained"
    >
      Let's play!
    </Button>
  );

  return (
    <span data-section id="snake">
      <div className="container">
        <div className={`board ${openResult ? "graph" : "grid"}`}>
          {openResult ? (
            <ResultGraph />
          ) : (
            <Board
              startGame={startGame}
              stopGame={stopGame}
              openScore={openScore}
              closeScoreModal={closeScoreModal}
              modalStyle={modalStyle}
              openResult={openResult}
            />
          )}
        </div>
        <div className="buttons">
          {openResult ? (
            <Play />
          ) : (
            <>
              {!bite && (
                <>
                  {!startGame ? <Start /> : !stopGame ? <Stop /> : <Resume />}
                </>
              )}
              <Reset />
              <Result />
            </>
          )}
        </div>
      </div>
      <Modal open={openStart} onClose={closeStartModal}>
        <Box sx={modalStyle}>
          <span className="exit-icon">
            <ClearIcon onClick={closeStartModal} />
          </span>
          <span className="modal-icons">
            <span className="icon up">
              <ArrowUpwardIcon />
            </span>
            <span className="icon down">
              <ArrowDownwardIcon />
            </span>
            <span className="icon right">
              <ArrowForwardIcon />
            </span>
            <span className="icon left">
              <ArrowBackIcon />
            </span>
          </span>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex" }}
          >
            Move with arrow keys
          </Typography>
        </Box>
      </Modal>
    </span>
  );
};

export default Snake;
