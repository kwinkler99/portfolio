import snakeHead from "../../assets/images/SnakeHead.png";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const Board = (props) => {
  const { startGame, stopGame } = props;
  const pointPosition = useSelector((state) => state.position.point);
  const headPosition = useSelector((state) => state.position.head);
  const directionPosition = useSelector((state) => state.position.direction);
  const tailPosition = useSelector((state) => state.position.tail);

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

    for (const cell of tailPosition) {
      let cellRef = document.getElementsByClassName(
        `position_${cell[0]}_${cell[1]}`
      )[0];

      if (cellRef) {
        cellRef.style.backgroundColor = "var(--blue)";
      }
    }
  }, [headPosition, tailPosition, pointPosition, stopGame, startGame]);

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
