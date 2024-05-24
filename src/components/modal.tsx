import { useBoard } from "../logic/board.logic";
import ReactModal from "react-modal";

export default function Modal() {
  const status = useBoard((s) => s.status);
  const changeDifficulty = useBoard((s) => s.changeDifficulty);

  const modalOpen = status === "won" || status === "lost";
  
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={modalOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "grid",
          placeItems: "center",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-[10rem]">you {status}</p>
        <br />
        <button
          onClick={() => changeDifficulty("easy")}
          className="text-3xl border rounded px-3 py-2"
        >
          play again
        </button>
      </div>
    </ReactModal>
  );
}
