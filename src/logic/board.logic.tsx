import { Cell } from "../models/Cell";
import { create } from "zustand";

export const Difficulties = {
  easy: 30,
  medium: 40,
  hard: 50,
} as const;

type Status = "playing" | "won" | "lost";

type Board = Cell[][];

type State = {
  board: Board;
  selectedCell: Cell | null;
  pencilMode: boolean;
  difficulty: number;
  history: Array<Board>;
  startTime: Date | null;
  mistakes: number;
  status: Status;
  hints: number;
};

type Actions = {
  setCellValue: (value: number | null) => void;
  setSelectedCell: (x: number, y: number) => void;
  togglePencilMode: () => void;
  togglePencilValue: (value: number) => void;
  changeDifficulty: (difficulty: keyof typeof Difficulties) => void;
  pushToHistory: (board: Board) => void;
  undo: () => void;
  setStartTime: (time: Date) => void;
  addMistake: () => void;
  setStatus: (status: Status) => void;
  getHint: () => void;
};

const initailBoard = generateBoard();
const start = new Date();

export const useBoard = create<State & Actions>((set, get) => ({
  board: initailBoard,
  selectedCell: null,
  pencilMode: false,
  difficulty: Difficulties.easy,
  history: [initailBoard],
  startTime: start,
  mistakes: 0,
  status: "playing",
  hints: 100,

  getHint: () => {
    if (get().hints === 0) return;

    get().setCellValue(get().selectedCell?.trueValue || null);

    return set((state) => ({
      hints: state.hints - 1,
    }));
  },

  addMistake: () => set((state) => ({ mistakes: state.mistakes + 1 })),

  setStatus: (status) => set({ status }),

  setStartTime: (startTime) => set({ startTime }),

  changeDifficulty: (difficulty) => {
    const newBoard = generateBoard(Difficulties[difficulty]);
    return set(() => ({
      difficulty: Difficulties[difficulty],
      board: newBoard,
      history: [newBoard],
      startTime: new Date(),
      mistakes: 0,
      status: "playing",
      pencilMode: false,
      selectedCell: null,
    }));
  },
  setCellValue: (value) => {
    const cell = get().selectedCell;

    if (!cell) return;
    const { x, y } = cell;

    set((state) => {
      const board = state.board;
      let newStatus = "playing" as Status;

      if (board[x][y].isValid()) return { board, status: newStatus };

      const newBoard = board.map((row, i) => {
        if (i !== x) return row;
        return row.map((cell, j) => {
          if (j !== y) return cell;

          const newCell = new Cell(x, y, value, cell.trueValue, false);
          if (value !== null && !newCell.isValid()) {
            state.addMistake();
          }
          return newCell;
        });
      });

      if (newBoard.every((row) => row.every((cell) => cell.isValid()))) {
        newStatus = "won";
      } else if (state.mistakes === 2) {
        newStatus = "lost";
      }

      return {
        board: newBoard,
        history: [...state.history, newBoard],
        status: newStatus,
      };
    });
  },
  setSelectedCell: (x, y) => {
    set((state) => {
      const selected = state.board[x][y];
      return { selectedCell: selected };
    });
  },
  togglePencilMode: () => set((state) => ({ pencilMode: !state.pencilMode })),
  togglePencilValue: (value) => {
    const cell = get().selectedCell;

    if (!cell) return;
    const { x, y } = cell;

    set((state) => {
      const board = state.board;

      if (board[x][y].isValid()) return { board };

      const newBoard = board.map((row, i) => {
        if (i !== x) return row;
        return row.map((cell, j) => {
          if (j !== y) return cell;

          const newCell = new Cell(x, y, null, cell.trueValue, false);
          newCell.pencilValues = board[x][y].pencilValues.slice();

          if (newCell.pencilValues[value - 1]) {
            newCell.pencilValues[value - 1] = null;
          } else {
            newCell.pencilValues[value - 1] = value;
          }

          return newCell;
        });
      });

      return { board: newBoard };
    });
  },

  pushToHistory: (board: Board) => {
    set((state) => ({ history: [...state.history, board] }));
  },
  undo: () => {
    set((state) => {
      if (state.history.length === 1) return state;

      return {
        board: state.history.at(-2),
        history: state.history.slice(0, -1),
      };
    });
  },
}));

function generateBoard(difficulty: number = Difficulties.easy) {
  const board = new Array(9).fill(0).map(() => new Array(9).fill(0));
  // [
  //   [0, 0, 0, 0]
  //   [0, 0, 0, 0]
  //   [0, 0, 0, 0]
  //   [0, 0, 0, 0]
  // ]

  function boardClosure(board: number[][]) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          const numbers = new Array(9)
            .fill(0)
            .map((_, k) => k + 1)
            .sort(() => Math.random() - 0.5);

          for (let k = 0; k < 9; k++) {
            if (isNumValid(board, i, j, numbers[k])) {
              board[i][j] = numbers[k];

              if (boardClosure(board)) {
                return true;
              }

              board[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  boardClosure(board);

  const positionsToRemove = Array(9 * 9)
    .fill(0)
    .map((_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(difficulty);

  const boardCells = board.map((row, rowIndex) =>
    row.map((value, columnIndex) => {
      const pos = rowIndex * 9 + columnIndex;

      if (!positionsToRemove.includes(pos))
        return new Cell(rowIndex, columnIndex, null, value, false);

      return new Cell(rowIndex, columnIndex, value, value, true);
    })
  );

  return boardCells;
}

function isNumValid(board: number[][], x: number, y: number, num: number) {
  for (let i = 0; i < 9; i++) {
    if (board[i][y] === num) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (board[x][i] === num) return false;
  }

  const squareRowStart = Math.floor(x / 3) * 3;
  const squareColStart = Math.floor(y / 3) * 3;

  for (let i = squareRowStart; i < squareRowStart + 3; i++) {
    for (let j = squareColStart; j < squareColStart + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}
