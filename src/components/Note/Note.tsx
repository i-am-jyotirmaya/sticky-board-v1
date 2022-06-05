import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import NoteEditor from "../NoteEditor/NoteEditor";
import * as styles from "./Note.module.scss";

// import { prop, provider, ydoc } from "../../store";

export interface INoteOptions {
  doc: Y.Doc;
}

export interface INoteProps {
  title: string;
  options: INoteOptions;
}

const Note: React.FC<INoteProps> = ({ options, title }): JSX.Element => {
  const [fragment, setFragment] = useState<Y.XmlFragment>();

  const providerRef = useRef<WebrtcProvider>();

  useEffect(() => {
    if (!providerRef.current) providerRef.current = new WebrtcProvider(options.doc.guid, options.doc);
    console.log(options.doc.guid);
    const map = options.doc.getMap("rootMap");

    const observeCallback = () => {
      const frag = map.get("content") as Y.XmlFragment;
      console.log("obs");
      setFragment(frag);
    };

    if (map.get("content")) setFragment(map.get("content") as Y.XmlFragment);

    map.observe(observeCallback);

    return () => {
      observeCallback && map.unobserve(observeCallback);
    };
  }, []);

  return (
    <Card title={title}>
      {providerRef.current && fragment && <NoteEditor fragment={fragment} provider={providerRef.current} />}
    </Card>
  );
};

export default Note;
