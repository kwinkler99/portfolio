import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { right, left, up, down } from "../../reducers/movement";

const Move = (props) => {
  const { stopGame } = props;
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const dispatch = useDispatch();
  const directionPosition = useSelector((state) => state.position.direction);

  const movement = () => {
    switch (directionPosition) {
      case "left":
        dispatch(left());
        break;
      case "right":
        dispatch(right());
        break;
      case "down":
        dispatch(down());
        break;
      case "up":
        dispatch(up());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (stopGame) {
      resetAnimation();
      window.removeEventListener("keydown", detectKeyDown);
    }
  }, [stopGame]);

  useEffect(() => {
    if (!stopGame) {
      window.addEventListener("keydown", detectKeyDown);
      return () => {
        window.removeEventListener("keydown", detectKeyDown);
      };
    }
  }, [directionPosition, stopGame]);

  const resetAnimation = () => {
    cancelAnimationFrame(requestRef.current);
    previousTimeRef.current = undefined;
  };

  const detectKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (directionPosition !== "left" && directionPosition !== "right") {
          resetAnimation();
          dispatch(left());
        }
        break;
      case "ArrowRight":
        if (directionPosition !== "right" && directionPosition !== "left") {
          resetAnimation();
          dispatch(right());
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (directionPosition !== "down" && directionPosition !== "up") {
          resetAnimation();
          dispatch(down());
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (directionPosition !== "up" && directionPosition !== "down") {
          resetAnimation();
          dispatch(up());
        }
        break;
      default:
        break;
    }
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 500) {
        movement();
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!stopGame) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [directionPosition, stopGame]);

  return <></>;
};

export default Move;
