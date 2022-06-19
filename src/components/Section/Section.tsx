import "./Section.scss";

import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import * as Y from "yjs";

import { NoteData, SectionData } from "../../store";
import Note from "../Note/Note";
import { SectionHeader } from "../SectionHeader/SectionHeader";

interface ISectionProps {
  sectionData: SectionData;
  deleteSection: VoidFunction;
}

export const Section: React.FC<ISectionProps> = ({ sectionData, deleteSection }) => {
  const [name, setName] = useState("");

  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  const addNoteButtonRef = useRef<HTMLDivElement>(null);

  const [maxHeight, setMaxheight] = useState("");
  const [noteListMaxHeight, setNoteListMaxHeight] = useState("");

  useEffect(() => {
    // console.log(sectionHeaderRef.current?.clientHeight);
    setMaxheight(`calc(100% - ${sectionHeaderRef.current?.clientHeight ?? 0}px)`);
    // console.log(maxHeight);
  }, [sectionHeaderRef.current]);

  useEffect(() => {
    // console.log(addNoteButtonRef.current?.clientHeight);
    setNoteListMaxHeight(`calc(100% - ${addNoteButtonRef.current?.clientHeight ?? 0}px - 16px)`);
    // console.log(maxHeight);
  }, [addNoteButtonRef.current]);

  const sectionMapRef = useRef<SectionData>();
  const notesArrRef = useRef<Y.Array<NoteData>>();
  const sectionNameRef = useRef<Y.Text>();
  const sectionIdRef = useRef<string>();

  useEffect(() => {
    if (!sectionMapRef.current) sectionMapRef.current = sectionData;
    if (!notesArrRef.current) notesArrRef.current = sectionData.get("notes");
    if (!sectionNameRef.current) sectionNameRef.current = sectionData.get("name");
    if (!sectionIdRef.current) sectionIdRef.current = sectionData.get("sectionId");
    setName(sectionNameRef.current?.toString() ?? "");
  }, []);

  const prepareNotesJsx = () => {
    return notesArrRef.current?.toArray().map((map, index) => <Note key={index} options={{ map }} />);
  };

  const handleAddNoteButton = () => {
    const note = new Y.Map();
    note.set("title", new Y.Text("New Note"));
    note.set("content", new Y.XmlFragment());
    note.set("color", new Y.Text("#FFFFFF"));
    notesArrRef.current!.push([note]);
  };

  const handleDeleteButton = () => {
    if (notesArrRef.current?.toArray().length) {
      Modal.confirm({
        title: "Confirm",
        content: "This section is not empty. Do you want to delete?",
        onOk() {
          deleteSection();
        },
        okText: "Delete",
        cancelText: "Cancel",
        okButtonProps: {
          danger: true,
        },
        maskClosable: true,
      });
    } else {
      deleteSection();
    }
  };

  return (
    <div
      className="bg-slate-100 max-w-sm rounded-lg flex flex-col max-h-full border-2 border-slate-300"
      style={{ minWidth: "20rem" }}
    >
      {sectionNameRef.current && (
        <SectionHeader
          ref={sectionHeaderRef}
          text={sectionNameRef.current}
          onAddClick={() => {
            handleAddNoteButton();
          }}
          onDeleteClick={handleDeleteButton}
        />
      )}

      <div
        className="flex flex-col flex-grow p-2 bg-slate-300 rounded-lg border-t-slate-400 border-t-2 notes-container"
        style={{ maxHeight }}
      >
        {/* <DashedButton ref={addNoteButtonRef} onClick={() => {}}>
          <PlusCircleFilled />
          <span className="ml-2 uppercase">Add note</span>
        </DashedButton> */}

        {notesArrRef.current?.toArray().length ? (
          <div className="flex-grow board-section" style={{ maxHeight: noteListMaxHeight }}>
            <SimpleBar style={{ height: "100%", maxHeight: "100%", marginTop: 8 }}>{prepareNotesJsx()}</SimpleBar>
          </div>
        ) : (
          <p className="text-lg font-semibold text-slate-400 text-center pt-4 tracking-wider pointer-events-none select-none">
            NOTHING HERE
          </p>
        )}
      </div>
    </div>
  );
};
