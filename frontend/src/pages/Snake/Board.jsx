import snakeHead from "../../assets/images/SnakeHead.png";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const Board = (props) => {
  const { startGame, stopGame, openScore } = props;
  const pointPosition = useSelector((state) => state.position.point);
  const headPosition = useSelector((state) => state.position.head);
  const directionPosition = useSelector((state) => state.position.direction);
  const tailPosition = useSelector((state) => state.position.tail);
  const bite = useSelector((state) => state.position.bite);

  const boardNumber = 14;

  useEffect(() => {
    let headRef = document.getElementsByClassName(
      `position_${headPosition[0]}_${headPosition[1]}`
    )[0];

    let pointRef = document.getElementsByClassName(
      `position_${pointPosition[0]}_${pointPosition[1]}`
    )[0];

    if (pointRef) {
      pointRef.style.backgroundColor = "var(--gold)";
    }

    if (headRef) {
      headRef.style.background = `url(${snakeHead})`;
      headRef.style.backgroundSize = "cover";

      if (directionPosition === "down") {
        headRef.style.transform = "rotate(0)";
      } else if (directionPosition === "up") {
        headRef.style.transform = "rotate(180deg)";
      } else if (directionPosition === "right") {
        headRef.style.transform = "rotate(270deg)";
      } else if (directionPosition === "left") {
        headRef.style.transform = "rotate(90deg)";
      }
    }

    if (bite) {
      if (headRef) {
        headRef.style.boxShadow = "inset 0px 0px 5px 2px #802323";
      }

      let biteRef = document.getElementsByClassName(
        `position_${bite[0]}_${bite[1]}`
      )[0];

      if (biteRef) {
        biteRef.style.boxShadow = "inset 0px 0px 5px 2px #802323";
      }
    }

    for (const cell of tailPosition) {
      let cellRef = document.getElementsByClassName(
        `position_${cell[0]}_${cell[1]}`
      )[0];

      if (cellRef) {
        cellRef.style.backgroundColor = "var(--blue)";
      }
    }
  }, [
    headPosition,
    tailPosition,
    pointPosition,
    stopGame,
    startGame,
    bite,
    openScore,
  ]);

  const Grid = () =>
    [...Array(boardNumber)].map((e, i) => {
      return [...Array(boardNumber)].map((e, j) => (
        <span className={`boardCell position_${i}_${j}`} key={`${i}_${j}`} />
      ));
    });

  return (
    <>
      <Grid />
    </>
  );
};

export default Board;
