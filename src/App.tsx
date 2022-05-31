import "./App.scss";

import { Route, Routes } from "react-router-dom";

import Appbar from "./components/Appbar/Appbar";
import Board from "./components/Board/Board";
import Play from "./components/Play";

function App() {
  return (
    <div className="App h-full">
      {/* <Appbar /> */}
      <Play />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
