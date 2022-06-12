import { Card, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";

import NoteEditor from "../NoteEditor/NoteEditor";
import * as styles from "./Note.module.scss";

export interface INoteOptions {
  map: Y.Map<any>;
}

export interface INoteProps {
  options: INoteOptions;
}

const Note: React.FC<INoteProps> = ({ options }): JSX.Element => {
  console.group("Loading component Note");

  // const [fragment, setFragment] = useState<Y.XmlFragment>();
  const [name, setName] = useState("");

  const rootMapRef = useRef<Y.Map<any>>();
  const fragmentRef = useRef<Y.XmlFragment>();
  const titleTextRef = useRef<Y.Text>();

  // const observeCallback = () => {
  //   console.log("obs");
  //   const frag = rootMapRef.current?.get("content") as Y.XmlFragment;
  //   const newName = rootMapRef.current?.get("title") as Y.Text;
  //   setName(newName.toString());
  // };

  // useEffect(() => {
  //   // if (!docRef.current) docRef.current = options.doc;
  //   // if (!providerRef.current) providerRef.current = new WebrtcProvider(docRef.current.guid, docRef.current);
  //   // if (!rootMapRef.current) rootMapRef.current = docRef.current.getMap("rootMap");
  //   if (!rootMapRef.current) rootMapRef.current = options.map;
  // }, []);

  useEffect(() => {
    console.log("Running Effect");
    if (!rootMapRef.current) rootMapRef.current = options.map;
    if (!fragmentRef.current) fragmentRef.current = rootMapRef.current.get("content") as Y.XmlFragment;
    if (!titleTextRef.current) titleTextRef.current = rootMapRef.current.get("title") as Y.Text;
    setName(titleTextRef.current?.toString() ?? "");
    // const map = rootMapRef.current;
    // console.log(map);

    // if (map?.get("content")) {
    //   setFragment(map?.get("content") as Y.XmlFragment);
    // }

    // if (map?.get("title")) {
    //   setName((map?.get("title") as Y.Text).toString());
    // }

    // map?.observeDeep(observeCallback);

    // return () => {
    //   observeCallback && map?.unobserveDeep(observeCallback);
    // };

    titleTextRef.current.observe((ev, tr) => {
      setName(titleTextRef.current?.toString() ?? "");
    });
  }, []);

  // console.log(providerRef.current, fragment);
  return (
    <Card
      title={
        <>
          <Input
            // className={classes}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              titleTextRef.current?.delete(0, titleTextRef.current.length);
              titleTextRef.current?.insert(0, e.target.value);
              // setName(e.target.value);
            }}
            // disabled={!isEditMode}
            bordered={false}
          />
        </>
      }
    >
      {fragmentRef.current && <NoteEditor fragment={fragmentRef.current} />}
    </Card>
  );
};

export default Note;
