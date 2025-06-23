import cn from "mcn";
import { FRET_DOTS, NOTE_COLORS } from "../global";
import { useTuning } from "../hooks/useTuning";
import { playNote, playWholeFret } from "../utils/audio";
import { getNoteName } from "../utils/notes";

export function Fret({
  header,
  stringNumber,
  fretNumber,
}: { header?: boolean; stringNumber: number; fretNumber: number }) {
  const [tuning] = useTuning();
  const openStringNote = tuning[stringNumber];
  const noteName = getNoteName(openStringNote, fretNumber);

  if (header) {
    return (
      <div
        onClick={async () => {
          playWholeFret(fretNumber, tuning);
        }}
        className={cn(
          "flex justify-center w-[38px] m-2 p-2 cursor-pointer rounded-md bg-neutral-800 hover:bg-neutral-600",
          [FRET_DOTS.includes(fretNumber), "border-t-4 pt-1 border-neutral-700"],
        )}
      >
        {fretNumber}
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        playNote(stringNumber, fretNumber, tuning);
      }}
      className={cn(
        "flex w-[38px] justify-center m-2 p-2 rounded-md cursor-pointer hover:scale-[0.95] transition-transform",
        [Boolean(noteName), NOTE_COLORS[noteName], "bg-neutral-800"],
      )}
    >
      {getNoteName(openStringNote, fretNumber)}
    </div>
  );
}
