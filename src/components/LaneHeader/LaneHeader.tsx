import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import classNames from "classnames";
import { useState } from "react";

import styles from "./LaneHeader.module.scss";

const LaneHeader = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [laneName, setLaneName] = useState("");

  const handleLaneNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLaneName(e.target.value);
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleSaveNameButtonClick = () => {
    setEditMode(false);
  };

  const classes = classNames("flex-1", styles.laneName, { [styles.editActive]: isEditMode });

  return (
    <div className="bg-white rounded-lg shadow-md p-1">
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
};

export default LaneHeader;
