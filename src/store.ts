import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

interface IProp {
  username: string;
  color: string;
}

export const ydoc = new Y.Doc();
export const provider = new WebrtcProvider("test-board-room", ydoc);

export const prop: IProp = {
  username: "",
  color: "#958DF1",
};

export const setProp = (username: string) => {
  prop.username = username;
};
