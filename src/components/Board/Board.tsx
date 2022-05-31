import "./Board.scss";

import { PlusCircleFilled } from "@ant-design/icons";
import SimpleBar from "simplebar-react";
import * as Y from "yjs";

import { BoardContext } from "../../contexts/BoardContext";
import { SectionData, useCollaborativeBoard } from "../../store";
import { DashedButton } from "../Button/DashedButton";
import { Section } from "../Section/Section";

const Board = () => {
  const roomId = "test-board-room";
  const { board, provider, updateCount } = useCollaborativeBoard({
    roomId,
  });

  return (
    <BoardContext.Provider value={{ board, roomId, provider, updateCount }}>
      <div className="bg-amber-200 px-4 py-2 m-auto w-full h-full rounded-lg flex flex-col">
        <h1 className="text-lg board-title">Board</h1>
        <div className="max-w-full flex gap-2 flex-grow board-content">
          <DashedButton
            onClick={() => {
              const newSection: SectionData = new Y.Array<any>();
              console.log(newSection);
              board.insert(0, [newSection]);
            }}
            style={{
              minWidth: "13rem",
            }}
          >
            <PlusCircleFilled />
            <span className="ml-2 uppercase">Add section</span>
          </DashedButton>
          <div className="flex-grow max-h-full">
            <SimpleBar style={{ height: "100%", maxHeight: "100%" }}>
              {board.toArray().map((section, i) => (
                <Section key={i} sectionData={section} />
              ))}
            </SimpleBar>
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
