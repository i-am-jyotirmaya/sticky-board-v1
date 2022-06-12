import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import * as Y from "yjs";

import { BoardContext } from "../../contexts/BoardContext";

interface INoteEditorProps {
  fragment: Y.XmlFragment;
}

const NoteEditor: React.FC<INoteEditorProps> = ({ fragment }) => {
  const { provider } = useContext(BoardContext);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        fragment,
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
  return <EditorContent editor={editor} />;
};

export default NoteEditor;
