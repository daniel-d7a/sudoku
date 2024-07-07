import { useEffect } from "react";
import { useBoard } from "./board.logic";

export function useKeyboard() {
  const setCellValue = useBoard((s) => s.setCellValue);
  const undo = useBoard((s) => s.undo);
  const togglePencilMode = useBoard((s) => s.togglePencilMode);
  const togglePencilValue = useBoard((s) => s.togglePencilValue);
  const pencilMode = useBoard((s) => s.pencilMode);
  const getHint = useBoard((s) => s.getHint);
  const selectedCell = useBoard((s) => s.selectedCell);
  const setSelectedCell = useBoard((s) => s.setSelectedCell);

  function handleKeyboardInput({ key }: KeyboardEvent) {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(key))) {
      if (pencilMode) {
        togglePencilValue(Number(key));
      } else {
        setCellValue(Number(key));
      }
    } else if (key.toLowerCase() === "h") {
      getHint();
    } else if (key.toLowerCase() === "z") {
      undo();
    } else if (key === "Delete") {
      setCellValue(null);
    } else if (key.toLowerCase() === "p") {
      togglePencilMode();
    } else if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)
    ) {
      if (!selectedCell) return setSelectedCell(4, 4);

      if (key === "ArrowUp")
        return setSelectedCell((selectedCell.x - 1 + 9) % 9, selectedCell.y);
      if (key === "ArrowDown")
        return setSelectedCell((selectedCell.x + 1) % 9, selectedCell.y);
      if (key === "ArrowRight")
        return setSelectedCell(selectedCell.x, (selectedCell.y + 1) % 9);
      if (key === "ArrowLeft")
        return setSelectedCell(selectedCell.x, (selectedCell.y - 1 + 9) % 9);
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleKeyboardInput);
    return () => document.removeEventListener("keyup", handleKeyboardInput);
  });
}
