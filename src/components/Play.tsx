import { useEffect } from "react";

import { useCollaborativeBoard } from "../store";
import Board from "./Board/Board";
import { Section } from "./Section/Section";

const Play = () => {
  return (
    <div
      style={{
        height: "100%",
        padding: "1rem",
      }}
    >
      <Board />
    </div>
  );
};

export default Play;
