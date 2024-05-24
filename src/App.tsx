import { Board } from "./components/board";
import Buttons from "./components/buttons";
import Mistakes from "./components/mistakes";
import Modal from "./components/modal";
import { Numbers } from "./components/numbers";
import Timer from "./components/timer";
import { Difficulties, useBoard } from "./logic/board.logic";

function App() {
  const changeDifficulty = useBoard((s) => s.changeDifficulty);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex justify-between w-3/5">
        <Timer />
        <select
          className="mb-4"
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
    </main>
  );
}

export default App;
