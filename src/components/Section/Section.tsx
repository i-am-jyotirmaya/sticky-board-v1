import { PlusCircleFilled, YahooFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useContext } from "react";
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
  const prepareNotesJsx = () => {
    return sectionData.toArray().map((note, index) => <Note key={index} id="" content="" title="Note" />);
  };

  return (
    <div className="bg-slate-300 max-w-sm rounded-lg p-2" style={{ minWidth: "20rem" }}>
      <SectionHeader />
      <Row gutter={[16, 9]} className="mt-4">
        <Col span={24}>
          <DashedButton
            onClick={(e) => {
              const note = new Y.Map();
              note.set("title", "Note");
              note.set("content", "");
              sectionData.insert(0, [note]);
            }}
          >
            <PlusCircleFilled />
            <span className="ml-2 uppercase">Add note</span>
          </DashedButton>
          {prepareNotesJsx()}
        </Col>
      </Row>
    </div>
  );
};
