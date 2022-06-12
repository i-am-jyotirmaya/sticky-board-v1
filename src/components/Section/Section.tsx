import "./Section.scss";

import { PlusCircleFilled, YahooFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import { nanoid } from "nanoid";
import { useContext, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import * as Y from "yjs";

import { BoardContext } from "../../contexts/BoardContext";
import { SectionData } from "../../store";
import { DashedButton } from "../Button/DashedButton";
import Note from "../Note/Note";
import { SectionHeader } from "../SectionHeader/SectionHeader";

interface ISectionProps {
  sectionData: SectionData;
}

export const Section: React.FC<ISectionProps> = ({ sectionData }) => {
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  const addNoteButtonRef = useRef<HTMLDivElement>(null);

  const [maxHeight, setMaxheight] = useState("");
  const [noteListMaxHeight, setNoteListMaxHeight] = useState("");

  useEffect(() => {
    console.log(sectionHeaderRef.current?.clientHeight);
    setMaxheight(`calc(100% - ${sectionHeaderRef.current?.clientHeight ?? 0}px - 16px)`);
    console.log(maxHeight);
  }, [sectionHeaderRef.current]);

  useEffect(() => {
    console.log(addNoteButtonRef.current?.clientHeight);
    setNoteListMaxHeight(`calc(100% - ${addNoteButtonRef.current?.clientHeight ?? 0}px - 16px)`);
    console.log(maxHeight);
  }, [addNoteButtonRef.current]);

  const prepareNotesJsx = () => {
    return sectionData.toArray().map((map, index) => <Note key={index} options={{ map }} />);
  };

  const handleAddNoteButton = () => {
    // const id = nanoid();
    // console.log("nid", id);
    // const doc = new Y.Doc({ autoLoad: true, guid: id });
    // const note = doc.getMap("rootMap");
    const note = new Y.Map();
    note.set("title", new Y.Text("New Note"));
    note.set("content", new Y.XmlFragment());
    sectionData.push([note]);
  };

  return (
    <div className="bg-slate-300 max-w-sm rounded-lg p-2 flex flex-col max-h-full" style={{ minWidth: "20rem" }}>
      <SectionHeader ref={sectionHeaderRef} />

      <div className="flex flex-col flex-grow mt-4" style={{ maxHeight }}>
        <DashedButton
          ref={addNoteButtonRef}
          onClick={() => {
            handleAddNoteButton();
          }}
        >
          <PlusCircleFilled />
          <span className="ml-2 uppercase">Add note</span>
        </DashedButton>

        <div className="flex-grow board-section" style={{ maxHeight: noteListMaxHeight }}>
          <SimpleBar style={{ height: "100%", maxHeight: "100%", marginTop: 8 }}>{prepareNotesJsx()}</SimpleBar>
        </div>
      </div>
    </div>
  );
};
