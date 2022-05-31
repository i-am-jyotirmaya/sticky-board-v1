import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import { useState } from "react";

import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> & React.ClassAttributes<HTMLDivElement>;

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>((props, ref) => {
  const [isEditMode, setEditMode] = useState(false);
  const [laneName, setLaneName] = useState("");
  const [isNameSubmitting, setNameSubmitting] = useState(false);

  const handleLaneNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLaneName(e.target.value);
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleSaveNameButtonClick = () => {
    setNameSubmitting(true);
    // Save name
    // Using timeout to emulate real behaviour
    setTimeout(() => {
      setEditMode(false);
      setNameSubmitting(false);
    }, 1000);
  };

  const rootClasses = classNames(props.className, "bg-white rounded-lg shadow-md p-1");
  const classes = classNames("flex-1", styles.laneName, { [styles.editActive]: isEditMode });

  return (
    <div {...props} ref={ref} className={rootClasses}>
      <div className="flex">
        <Input
          className={classes}
          value={laneName}
          onChange={handleLaneNameOnChange}
          disabled={!isEditMode}
          bordered={false}
        />
        {isEditMode ? (
          <Tooltip title="">
            <Button
              type="text"
              loading={isNameSubmitting}
              icon={<CheckOutlined />}
              onClick={handleSaveNameButtonClick}
            />
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
