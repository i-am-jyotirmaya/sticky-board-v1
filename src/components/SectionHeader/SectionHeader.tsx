import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Tooltip } from "antd";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";

import styles from "./SectionHeader.module.scss";

interface ISectionOptions {
  text: Y.Text;
}
type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  React.ClassAttributes<HTMLDivElement> &
  ISectionOptions;

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>((props, ref) => {
  const [isEditMode, setEditMode] = useState(false);
  const [laneName, setLaneName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const { text } = props;

  useEffect(() => {
    setLaneName(text.toString());
    text.observe((ev, tr) => {
      setLaneName(text.toString());
      if (tr.origin) flash();
    });
  }, []);

  const handleSaveNameButtonClick = () => {
    if (text.toString() !== inputRef.current?.input?.value) {
      text?.delete(0, text.length);
      text?.insert(0, inputRef.current?.input?.value ?? "");
    }

    setEditMode(false);
  };

  const flash = () => {
    if (inputRef.current && inputRef.current.input) {
      inputRef.current.input.animate([{ backgroundColor: "yellow" }, { backgroundColor: "transparent" }], {
        duration: 300,
      });
    }
  };

  const handleLaneNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLaneName(e.target.value);
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const rootClasses = classNames(props.className, "bg-white rounded-lg shadow-md p-1");
  const classes = classNames("flex-1", styles.laneName, { [styles.editActive]: isEditMode });

  return (
    <div {...props} ref={ref} className={rootClasses}>
      <div className="flex">
        <Input
          ref={inputRef}
          className={classes}
          value={laneName}
          onChange={handleLaneNameOnChange}
          disabled={!isEditMode}
          bordered={false}
        />
        {isEditMode ? (
          <Tooltip title="">
            <Button type="text" icon={<CheckOutlined />} onClick={handleSaveNameButtonClick} />
          </Tooltip>
        ) : (
          <Tooltip title="Edit Lane name">
            <Button type="text" icon={<EditOutlined />} onClick={handleEditButtonClick} />
          </Tooltip>
        )}
      </div>
    </div>
  );
});
