import { useEffect, useState } from "react";

import axios from "axios";

const ResultGraph = () => {
  const scoreSections = [10, 20, 30, 50, 70, 100, 197];
  let defaultDataState = scoreSections.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});
  const [data, setData] = useState({});
  const [sum, setSum] = useState(0);

  useEffect(() => {
    axios
      .get("/api/scores")
      .then((response) => {
        let tmpData = { ...defaultDataState };
        let tmpSum = 0;
        for (let record of response.data) {
          for (let scale of scoreSections) {
            if (record.value < scale) {
              tmpData[scale] += 1;
              tmpSum += 1;
              break;
            }
          }
        }

        setSum(tmpSum);
        setData(tmpData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Columns = () =>
    scoreSections.map((score, i) => (
      <div
        style={{
          gridRow: `span ${data[score]} / -1`,
          height: data[score] > 0 ? "100%" : "0",
        }}
        className={`column index_${i}`}
        key={i}
      />
    ));

  let rows = Object.values(data).sort((a, b) => b - a)[0];

  return (
    <span className="edges">
      <div
        className="columns"
        style={{ gridTemplateRows: `repeat(${rows}, ${400 / sum + 2}px)` }}
      >
        <Columns />
      </div>
      <span className="legend-left">
        <p className="description">count</p>
        {[
          ...new Set(
            Object.values(data)
              .sort((a, b) => b - a)
              .filter((count) => count > 0)
          ),
        ].map((count, index) => {
          return (
            <p style={{ bottom: (400 / sum) * count }} key={`left_${index}`}>
              {count}
            </p>
          );
        })}
      </span>
      <span className="legend-down">
        {scoreSections.map((score, index) => (
          <p key={`down_${score}`}>{`>${score}`}</p>
        ))}
        <p className="description">score</p>
      </span>
    </span>
  );
};

export default ResultGraph;
