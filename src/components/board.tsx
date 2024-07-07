import { Fragment } from "react";
import { useBoard } from "../logic/board.logic";
import { Cell } from "../models/Cell";

export function Board() {
  const board = useBoard((s) => s.board);

  return (
    <div className="size-[19rem] md:size-[30rem]  rounded-2xl p-2 md:p-4 flex flex-col justify-between bg-slate-900">
      {board.map((_, rowIndex) => (
        <Fragment key={rowIndex}>
          <div className=" w-full h-20 flex justify-between">
            {board[rowIndex].map((value, columnIndex) => (
              <Fragment key={`${rowIndex}-${columnIndex}`}>
                <BoardCell
                  value={value}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                />
                {[2, 5].includes(columnIndex) && <div className="" />}
              </Fragment>
            ))}
          </div>
          {[2, 5].includes(rowIndex) && <div className="h-2" />}
        </Fragment>
      ))}
    </div>
  );
}

function BoardCell({
  value,
  columnIndex,
  rowIndex,
}: {
  value: Cell;
  columnIndex: number;
  rowIndex: number;
}) {
  const setSelectedCell = useBoard((s) => s.setSelectedCell);
  const selectedCell = useBoard((s) => s.selectedCell);

  return (
    <div
      onClick={() => setSelectedCell(rowIndex, columnIndex)}
      className={`rounded bg-slate-800 size-7 md:size-10 grid  md:text-2xl place-items-center 
                    ${
                      value.x === selectedCell?.x && value.y === selectedCell?.y
                        ? "border-2"
                        : ""
                    }
                    ${value.isDefault && "text-white"}
                    ${value.isValid() && !value.isDefault && "text-green-600"}
                    ${value.userValue && !value.isValid() && "text-red-600"}
                  ${
                    !value.userValue &&
                    !value.pencilValues.every((p) => p === null) &&
                    "text-gray-400"
                  }
                  `}
    >
      {value.userValue ? (
        value.userValue
      ) : value.pencilValues.every((p) => p === null) ? null : (
        <PencilValues values={value.pencilValues} />
      )}
    </div>
  );
}

function PencilValues({ values }: { values: Array<number | null> }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-x-1">
      {values.map((v) => (
        <p className="text-[0.5rem] leading-3 col-span-1 row-span-1">{v}</p>
      ))}
    </div>
  );
}
