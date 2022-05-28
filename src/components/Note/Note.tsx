import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "antd";

import { prop, provider, ydoc } from "../../store";
import * as styles from "./Note.module.scss";

export interface INoteProps {
  title: string;
}

const Note: React.FC<INoteProps> = ({ title }): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: prop.username,
          color: prop.color,
        },
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
