import "../assets/style/snake.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { reset } from "../reducers/movement";
import Board from "./Snake/Board";

import { Box, Modal, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
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
          dispatch(reset());
          setStartGame(false);
          setStopGame(false);
        }}
        color="primary"
        variant="contained"
      >
        Reset
      </Button>
    );

  const Result = () => (
    <Button color="primary" variant="contained">
      Result
    </Button>
  );

  return (
    <span data-section id="snake">
      <div className="container">
        <div className="board">
          <Board
            startGame={startGame}
            stopGame={stopGame}
            openScore={openScore}
          />
        </div>
        <div className="buttons">
          {!bite && (
            <>{!startGame ? <Start /> : !stopGame ? <Stop /> : <Resume />}</>
          )}
          <Reset />
          <Result />
        </div>
      </div>
      <Modal open={openStart} onClose={closeStartModal}>
        <Box sx={style}>
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

      <Modal open={openScore} onClose={closeScoreModal}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Box sx={style}>
            <span className="exit-icon">
              <ClearIcon onClick={closeScoreModal} />
            </span>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, display: "flex" }}
            >
              {`Congratulation! Your score: ${"score_here"}`}
            </Typography>
          </Box>
        </motion.div>
      </Modal>
    </span>
  );
};

export default Snake;
