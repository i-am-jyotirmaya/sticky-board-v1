import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "antd";
import { useContext } from "react";
import * as Y from "yjs";

import { BoardContext } from "../../contexts/BoardContext";
import * as styles from "./Note.module.scss";

// import { prop, provider, ydoc } from "../../store";

export interface INoteOptions {
  bodyFragment: Y.XmlFragment;
}

export interface INoteProps {
  title: string;
  options: INoteOptions;
}

const Note: React.FC<INoteProps> = ({ options, title }): JSX.Element => {
  const { provider } = useContext(BoardContext);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        // document: ydoc,
        // field: id,
        fragment: options.bodyFragment,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: "user",
          color: "#958DF1",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  return (
    <Card title={title}>
      <EditorContent editor={editor} />
    </Card>
  );
};

export default Note;
