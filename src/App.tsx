import { Board } from "./components/board";
import Buttons from "./components/buttons";
import Mistakes from "./components/mistakes";
import Modal from "./components/modal";
import { Numbers } from "./components/numbers";
import Timer from "./components/timer";
import { Difficulties, useBoard } from "./logic/board.logic";
import { useKeyboard } from "./logic/useKeyboard";

function App() {
  const changeDifficulty = useBoard((s) => s.changeDifficulty);

  useKeyboard();

  return (
    <main className="flex flex-col items-center mt-16 md:my-4 w-full md:w-3/5 mx-auto poppins-medium">
      <div className="flex justify-center items-baseline gap-8 md:gap-32 w-full">
        <Timer />
        {/* TODO:get a nicer select */}
        <select
          className="mb-4 text-sm"
          onChange={(e) =>
            changeDifficulty(e.target.value as keyof typeof Difficulties)
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <Mistakes />
      </div>
      <Board />
      <Buttons />
      <Numbers />
      <Modal />
      <p className="mt-10 text-[0.7rem]">
        <a
          className="underline"
          target="_blank"
          href="https://icons8.com/icon/jXzfuurwNZ2X/sudoku"
        >
          Sudoku
        </a>{" "}
        icon by{" "}
        <a className="underline" target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </p>
    </main>
  );
}

export default App;
