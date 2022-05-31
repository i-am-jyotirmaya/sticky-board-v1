import { useEffect, useRef, useState } from "react";
import { Awareness } from "y-protocols/awareness";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

interface IProp {
  username: string;
  color: string;
}

// export const ydoc = new Y.Doc({ autoLoad: true });
// export const provider = new WebrtcProvider("test-board-room", ydoc, {
//   signaling: ["ws://localhost:4444"],
//   password: null,
//   awareness: new Awareness(ydoc),
//   maxConns: 20,
//   filterBcConns: true,
//   peerOpts: {},
// });
// ydoc.load();
// // boardLanes.push([laneArr]);
// console.log(ydoc);

// console.log("ydoc", ydoc);
// export const boardLanes = ydoc.getArray("lanes");

// ydoc.on("update", () => {
//   console.log("updated");
//   console.log("bl", boardLanes.length);
// });

// console.log("boardLanes", boardLanes.toArray(), boardLanes.length);
// export const laneArr = boardLanes.length ? boardLanes.toArray()[0] as Y.Array<any> : ;
// if (!boardLanes.length) boardLanes.push([laneArr]);
// console.log("boardLanes p", boardLanes.toArray(), boardLanes.length);
// console.log("la", laneArr);
export const prop: IProp = {
  username: "",
  color: "#958DF1",
};

export const setProp = (username: string) => {
  prop.username = username;
};
// {
//   signaling: ["ws://localhost:4444"],
//   password: null,
//   awareness: new Awareness(ydoc),
//   maxConns: 20,
//   filterBcConns: true,
//   peerOpts: {},
// }

// Hook Section

export interface ICollaborativeBoardOptions {
  roomId: string;
  signaling?: string[];
}

export type NoteData = Y.Map<any>;
export type SectionData = Y.Array<NoteData>;
export type BoardData = Y.Array<SectionData>;

export const useCollaborativeBoard = (opts: ICollaborativeBoardOptions) => {
  const { roomId } = opts;
  const [updateCount, setUpdateCount] = useState(0);
  const docRef = useRef(new Y.Doc({ autoLoad: true }));
  const boardRef = useRef(docRef.current.getArray<SectionData>("sections"));
  // boardRef.current.delete(0, boardRef.current.length);
  const providerRef = useRef<WebrtcProvider>();
  useEffect(() => {
    if (!providerRef.current) providerRef.current = new WebrtcProvider(roomId, docRef.current);
    // console.log("x", docRef.current, boardRef.current);
    docRef.current.on("update", () => {
      console.log(boardRef.current.length);
      setUpdateCount((prev) => prev + 1);
    });
  }, []);

  return { board: boardRef.current, provider: providerRef.current, updateCount };
};
