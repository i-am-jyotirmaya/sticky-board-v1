import { PlusCircleFilled } from "@ant-design/icons";
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
        <h1 className="text-lg">Board</h1>
        <div className="max-w-full overflow-x-auto flex gap-2 flex-grow">
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
          {board.toArray().map((section, i) => (
            <Section key={i} sectionData={section} />
          ))}
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
