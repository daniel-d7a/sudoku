import { useBoard } from "../logic/board.logic";

export function Numbers() {
  const setCellValue = useBoard((s) => s.setCellValue);
  const togglePencilValue = useBoard((s) => s.togglePencilValue);
  const pencilMode = useBoard((s) => s.pencilMode);

  return (
    <div className="grid grid-cols-3 place-items-center gap-x-2 gap-y-2 px-4 md:flex justify-center md:gap-2 mt-2 md:text-2xl w-full">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            onClick={() =>
              pencilMode ? togglePencilValue(i + 1) : setCellValue(i + 1)
            }
            className="transition-all active:bg-slate-800/80 hover:bg-slate-800 bg-slate-900 p-2 rounded-md md:size-12 grid w-full place-items-center cursor-pointer"
            key={i}
          >
            {i + 1}
          </div>
        ))}
    </div>
  );
}
