import { useBoard } from "../logic/board.logic";

export function Numbers() {
  const setCellValue = useBoard((s) => s.setCellValue);
  const togglePencilValue = useBoard((s) => s.togglePencilValue);
  const pencilMode = useBoard((s) => s.pencilMode);
  const selectedCell = useBoard((s) => s.selectedCell);

  return (
    <div className="w-3/5 flex justify-between mt-6 text-xl">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            onClick={() =>
              pencilMode
                ? togglePencilValue(selectedCell?.x, selectedCell?.y, i + 1)
                : setCellValue(selectedCell?.x, selectedCell?.y, i + 1)
            }
            className="border-2 p-2 rounded-md size-12 grid place-items-center cursor-pointer"
            key={i}
          >
            {i + 1}
          </div>
        ))}
    </div>
  );
}
