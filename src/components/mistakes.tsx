import { useBoard } from "../logic/board.logic";

export default function Mistakes() {
  const mistakes = useBoard((s) => s.mistakes);

  return <p className="text-sm">Mistakes {mistakes}/3</p>;
}
