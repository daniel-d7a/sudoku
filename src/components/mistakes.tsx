import { useBoard } from "../logic/board.logic";

export default function Mistakes() {
  const mistakes = useBoard((s) => s.mistakes);

  return <div>Mistakes {mistakes}/3</div>;
}
