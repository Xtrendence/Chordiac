import { NUMBER_OF_STRINGS, type Note } from "../global";

export function playNote(string: number, fret: number, tuning: Array<Note>) {
  const file = `/mp3/${string}-${fret}.mp3`;
  console.log(
    `Playing note: String ${string}, Fret ${fret}, File: ${file}, Tuning: ${tuning.join(", ")}`,
  );
  const audio = new Audio(file);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
}

export async function playWholeFret(fret: number, tuning: Array<Note>) {
  const order = Array.from({ length: NUMBER_OF_STRINGS }, (_, index) => index).reverse();
  for (const string of order) {
    playNote(string, fret, tuning);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
