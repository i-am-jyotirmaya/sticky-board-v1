import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card } from "antd";

import * as styles from "./Note.module.scss";

// import { prop, provider, ydoc } from "../../store";

export interface INoteProps {
  id: string;
  title: string;
  content: string;
}

const Note: React.FC<INoteProps> = ({ id, title, content }): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      // Collaboration.configure({
      //   document: ydoc,
      //   field: id,
      // }),
      // CollaborationCursor.configure({
      //   provider,
      //   user: {
      //     name: prop.username,
      //     color: prop.color,
      //   },
      // }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content,
  });

  return (
    <Card title={title}>
      <EditorContent editor={editor} />
    </Card>
  );
};

export default Note;
