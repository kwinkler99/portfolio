import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { right, left, up, down } from "../../reducers/movement";

const DefaultMove = () => {
  const dispatch = useDispatch();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  let counter = 1;

  const defaultMovement = () => {
    if (counter < 2) {
      dispatch(down());
    } else if (counter < 5) {
      dispatch(left());
    } else if (counter < 7) {
      dispatch(up());
    } else if (counter < 10) {
      dispatch(right());
    }

    counter = (counter + 1) % 10;
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 500) {
        defaultMovement();
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return <></>;
};

export default DefaultMove;
