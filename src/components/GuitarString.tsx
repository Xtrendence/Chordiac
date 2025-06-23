import { NUMBER_OF_FRETS } from "../global";
import { Fret } from "./Fret";

export function GuitarString({ number }: { number: number }) {
  if (number < 0) {
    return (
      <div className={"flex"}>
        {Array.from({ length: NUMBER_OF_FRETS }, (_, fretNumber) => (
          <Fret key={fretNumber.toString()} stringNumber={-1} fretNumber={fretNumber} header />
        ))}
      </div>
    );
  }

  return (
    <div className={"flex"}>
      {Array.from({ length: NUMBER_OF_FRETS }, (_, fretNumber) => (
        <Fret key={fretNumber.toString()} stringNumber={number} fretNumber={fretNumber} />
      ))}
    </div>
  );
}
