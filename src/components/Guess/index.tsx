import { Letter } from "../../api/Guess";

export const LetterBlock = ({ letter }: { letter: Letter }) => (
  <div className={`letter ${letter.status.toLowerCase()}`}>{letter.letter}</div>
);

export const Guess = ({ guess }: { guess: Letter[] }) => (
  <div className="letters">
    {guess.map((letter, i) => (
      <LetterBlock key={i} letter={letter} />
    ))}
  </div>
);
