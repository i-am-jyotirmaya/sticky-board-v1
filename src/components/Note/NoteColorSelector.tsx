import { useEffect, useState } from "react";
import { ColorResult, GithubPicker, SketchPicker } from "react-color";
import * as Y from "yjs";

import styles from "./Note.module.scss";

interface IProps {
  onColorChanged: (color: string) => void;
  text: Y.Text;
}

const NoteColorSelector: React.FC<IProps> = ({ onColorChanged, text }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  useEffect(() => {
    changeColor(text.toString());
    text.observe((ev, tr) => {
      changeColor(text.toString());
    });
  }, []);

  const handleClick = () => {
    setColorPickerVisible(true);
  };

  const handleClose = () => {
    setColorPickerVisible(false);
  };

  const handleChange = (color: ColorResult) => {
    changeColor(color.hex);
  };

  const changeColor = (colorHex: string) => {
    onColorChanged(colorHex);

    if (text.toString() !== colorHex) {
      text?.delete(0, text.length);
      text?.insert(0, colorHex);
    }
  };

  const colors = ["#FFFFFF", "#EB9694", "#FAD0C3", "#FEF3BD", "#C1E1C5", "#BEDADC", "#C4DEF6", "#BED3F3", "#D4C4FB"];

  return (
    <div style={{ position: "relative" }} className={styles.noteColorSelector}>
      <div className={styles.swatch} onClick={handleClick}>
        <div style={{ background: `${text.toString()}` }} className={styles.color}></div>
      </div>
      {colorPickerVisible ? (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={handleClose} />
          <GithubPicker
            width="220"
            color={text.toString()}
            colors={colors}
            onChange={handleChange}
            triangle="top-right"
          />
        </div>
      ) : null}
    </div>
  );
};

export default NoteColorSelector;
