import { useEffect, useRef, useState } from "react";
import { Awareness } from "y-protocols/awareness";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

interface IProp {
  username: string;
  color: string;
}

export const prop: IProp = {
  username: "",
  color: "#958DF1",
};

export const setProp = (username: string) => {
  prop.username = username;
};

// Hook Section

export interface ICollaborativeBoardOptions {
  roomId: string;
  signaling?: string[];
}

export type NoteData = Y.Map<any>;
export type SectionData = Y.Map<any>;
export type BoardData = Y.Array<SectionData>;

export const useCollaborativeBoard = (opts: ICollaborativeBoardOptions) => {
  const { roomId } = opts;
  const [updateCount, setUpdateCount] = useState(0);
  const docRef = useRef(new Y.Doc({ autoLoad: true }));
  const boardRef = useRef(docRef.current.getArray<SectionData>("sections"));
  const providerRef = useRef<WebrtcProvider>();
  useEffect(() => {
    if (!providerRef.current) providerRef.current = new WebrtcProvider(roomId, docRef.current);
    docRef.current.on("update", () => {
      // console.log(boardRef.current.length);
      setUpdateCount((prev) => prev + 1);
    });
  }, []);

  return { board: boardRef.current, provider: providerRef.current, updateCount };
};
