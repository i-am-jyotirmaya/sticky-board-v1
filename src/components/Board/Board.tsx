import Note from "../Note/Note";

const Board = () => {
  return (
    <div className="bg-amber-200 max-w-xs p-1 m-auto">
      <h1 className="text-lg">Board</h1>
      <Note title="Note" />
    </div>
  );
};

export default Board;
