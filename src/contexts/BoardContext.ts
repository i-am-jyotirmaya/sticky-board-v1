import React from "react";
import { WebrtcProvider } from "y-webrtc";

import { BoardData } from "../store";

interface IContextValues {
  board: BoardData | undefined;
  roomId: string;
  provider: WebrtcProvider | undefined;
  updateCount: number;
}

const defaultContextValues: IContextValues = {
  board: undefined,
  roomId: "",
  provider: undefined,
  updateCount: 0,
};

export const BoardContext = React.createContext<IContextValues>(defaultContextValues);
