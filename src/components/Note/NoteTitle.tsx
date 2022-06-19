import { CheckOutlined, EditFilled } from "@ant-design/icons";
import { Button, Input, InputRef, Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";

import styles from "./Note.module.scss";

const NoteTitle = ({ text }: { text: Y.Text }) => {
  const [name, setName] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setName(text.toString());
    text.observe((ev, tr) => {
      setName(text.toString());
      if (tr.origin) flash();
    });
  }, []);

  const flash = () => {
    if (inputRef.current && inputRef.current.input) {
      inputRef.current.input.animate([{ backgroundColor: "yellow" }, { backgroundColor: "transparent" }], {
        duration: 300,
      });
    }
  };

  const handleSaveNameButtonClick = () => {
    if (text.toString() !== inputRef.current?.input?.value) {
      text?.delete(0, text.length);
      text?.insert(0, inputRef.current?.input?.value ?? "");
    }

    setEditMode(false);
  };

  const classes = classNames("flex-1 px-0", styles.noteTitle, { [styles.editActive]: isEditMode });

  return (
    <div className="flex">
      <Input
        className={classes}
        ref={inputRef}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // text?.delete(0, text.length);
          // text?.insert(0, e.target.value);
          setName(e.target.value);
        }}
        disabled={!isEditMode}
        bordered={false}
      />
      {isEditMode ? (
        <Tooltip title="">
          <Button type="text" icon={<CheckOutlined />} onClick={handleSaveNameButtonClick} />
        </Tooltip>
      ) : (
        <Tooltip title="Edit Lane name">
          <Button type="text" icon={<EditFilled />} onClick={(e) => setEditMode(true)} />
        </Tooltip>
      )}
    </div>
  );
};

export default NoteTitle;
