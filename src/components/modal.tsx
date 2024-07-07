import { useBoard } from "../logic/board.logic";

export default function Modal() {
  const status = useBoard((s) => s.status);
  const changeDifficulty = useBoard((s) => s.changeDifficulty);

  const modalOpen = status === "won" || status === "lost";

  return (
    <>
      <div
        className={`z-50 back transition-all fixed top-0 left-0 w-full h-full flex items-center justify-center ${
          modalOpen ? "backdrop-blur visible" : "backdrop-blur-none invisible"
        }`}
      >
        <div
          className={`w-5/6 h-2/5 lg:w-1/2 rounded-lg text-black bg-slate-200/80 grid place-content-center `}
        >
          <p className="text-3xl md:text-6xl mb-8">
            you {status === "won" ? "won 🥳" : "lost 😥"}
          </p>
          <button
            onClick={() => changeDifficulty("easy")}
            className=" md:text-2xl border-2 md:border-4 border-black hover:bg-slate-200/70 active:bg-slate-200/80 transition-all rounded-full px-3 py-2"
          >
            play again
          </button>
        </div>
      </div>
    </>
  );
}
