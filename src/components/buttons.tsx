import { FaEraser, FaLightbulb, FaUndo } from "react-icons/fa";
import { useBoard } from "../logic/board.logic";
import { BsFillPencilFill, BsPencil } from "react-icons/bs";

const btnClasses =
  "flex-col flex items-center justify-center cursor-pointer transition-all p-1 active:bg-slate-800/80 hover:bg-slate-800 rounded-md";

const iconTextClasses = "text-xs md:text-sm mt-1";

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
  const setCellValue = useBoard((s) => s.setCellValue);

  return (
    <div onClick={() => setCellValue(null)} className={btnClasses}>
      <FaEraser className="text-2xl md:text-4xl" />
      <p className={iconTextClasses}>Eraser</p>
    </div>
  );
}

function Hint() {
  const hintCount = useBoard((s) => s.hints);
  const getHint = useBoard((s) => s.getHint);

  return (
    <div
      onClick={() => {
        getHint();
      }}
      className={`${btnClasses} ${!hintCount && "brightness-75"}`}
    >
      <FaLightbulb className="text-2xl md:text-4xl" />
      <p className={iconTextClasses}>Hint ({hintCount})</p>
    </div>
  );
}

function Pencil() {
  const pencilMode = useBoard((s) => s.pencilMode);
  const togglePencilMode = useBoard((s) => s.togglePencilMode);

  return (
    <div onClick={togglePencilMode} className={btnClasses}>
      {!pencilMode ? (
        <BsPencil className="text-2xl md:text-4xl" />
      ) : (
        <BsFillPencilFill className="text-2xl md:text-4xl" />
      )}
      <p className={iconTextClasses}>Pencil</p>
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
      className={`${btnClasses}  ${!canUndo && "brightness-75"}`}
    >
      <FaUndo className="text-2xl md:text-4xl" />
      <p className={iconTextClasses}>Undo</p>
    </div>
  );
}
