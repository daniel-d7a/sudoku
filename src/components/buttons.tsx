import { FaEraser, FaLightbulb, FaUndo } from "react-icons/fa";
import { useBoard } from "../logic/board.logic";
import { useState } from "react";
import { BsFillPencilFill, BsPencil } from "react-icons/bs";

export default function Buttons() {
  return (
    <div className="w-3/5 justify-center gap-10 mt-4 flex">
      <Eraser />
      <Hint />
      <Pencil />
      <Undo />
    </div>
  );
}

function Eraser() {
  const selectedCell = useBoard((s) => s.selectedCell);
  const setCellValue = useBoard((s) => s.setCellValue);

  return (
    <div
      onClick={() => setCellValue(selectedCell?.x, selectedCell?.y, null)}
      className="flex-col flex items-center justify-center"
    >
      <FaEraser size={30} />
      <p className="text-sm mt-1">Eraser</p>
    </div>
  );
}

function Hint() {
  const selectedCell = useBoard((s) => s.selectedCell);
  const setCellValue = useBoard((s) => s.setCellValue);
  const [hintCount, setHintCount] = useState(100);

  return (
    <div
      onClick={() => {
        if (!selectedCell || !hintCount) return;
        setCellValue(selectedCell.x, selectedCell.y, selectedCell.trueValue);
        setHintCount((c) => c - 1);
      }}
      className={`flex-col flex items-center justify-center ${
        !hintCount && "brightness-75"
      }`}
    >
      <FaLightbulb size={30} />
      <p className="text-sm mt-1">Hint ({hintCount})</p>
    </div>
  );
}

function Pencil() {
  const pencilMode = useBoard((s) => s.pencilMode);
  const togglePencilMode = useBoard((s) => s.togglePencilMode);

  return (
    <div
      onClick={togglePencilMode}
      className="flex-col flex items-center justify-center"
    >
      {!pencilMode ? <BsPencil size={30} /> : <BsFillPencilFill size={30} />}
      <p className="text-sm mt-1">Pencil</p>
    </div>
  );
}

function Undo() {
  const undo = useBoard((s) => s.undo);
  const history = useBoard((s) => s.history);

  const canUndo = history.length > 1;

  return (
    <div
      onClick={() => undo()}
      className={`flex-col flex items-center justify-center ${
        !canUndo && "brightness-75"
      }`}
    >
      <FaUndo size={30} />
      <p className="text-sm mt-1">Undo</p>
    </div>
  );
}
