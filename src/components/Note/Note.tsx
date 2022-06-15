import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";

import { NoteData } from "../../store";
import NoteEditor from "../NoteEditor/NoteEditor";
import * as styles from "./Note.module.scss";
import NoteColorSelector from "./NoteColorSelector";
import NoteTitle from "./NoteTitle";

export interface INoteOptions {
  map: NoteData;
}

export interface INoteProps {
  options: INoteOptions;
}

const Note: React.FC<INoteProps> = ({ options }): JSX.Element => {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const rootMapRef = useRef<NoteData>();
  const fragmentRef = useRef<Y.XmlFragment>();
  const titleTextRef = useRef<Y.Text>();
  const colorTextRef = useRef<Y.Text>();

  useEffect(() => {
    if (!rootMapRef.current) rootMapRef.current = options.map;
    if (!fragmentRef.current) fragmentRef.current = rootMapRef.current.get("content") as Y.XmlFragment;
    if (!titleTextRef.current) titleTextRef.current = rootMapRef.current.get("title") as Y.Text;
    if (!colorTextRef.current) colorTextRef.current = rootMapRef.current.get("color") as Y.Text;
    setName(titleTextRef.current?.toString() ?? "");
  }, []);

  return (
    <Card
      title={titleTextRef.current && <NoteTitle text={titleTextRef.current} />}
      extra={
        colorTextRef.current && (
          <NoteColorSelector
            text={colorTextRef.current}
            onColorChanged={(color) => {
              setBgColor(color);
            }}
          />
        )
      }
      style={{ backgroundColor: bgColor }}
    >
      {fragmentRef.current && <NoteEditor fragment={fragmentRef.current} />}
    </Card>
  );
};

export default Note;
