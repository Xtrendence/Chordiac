import { getDefaultStore } from "jotai";
import cn from "mcn";

export const NUMBER_OF_STRINGS = 6;
export const NUMBER_OF_FRETS = 25; // Open string + 24 frets

export const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"] as const;
export type Note = (typeof NOTES)[number];

export const NOTE_COLORS = {
  A: cn("bg-emerald-600/70"),
  "A#": cn("bg-emerald-700/70"),
  B: cn("bg-amber-600/70"),
  C: cn("bg-blue-500/70"),
  "C#": cn("bg-blue-600/70"),
  D: cn("bg-red-700/70"),
  "D#": cn("bg-red-800/70"),
  E: cn("bg-yellow-300/70"),
  F: cn("bg-purple-500/70"),
  "F#": cn("bg-purple-600/70"),
  G: cn("bg-pink-500/70"),
  "G#": cn("bg-pink-600/70"),
};

export const STANDARD_TUNING: Array<Note> = ["E", "A", "D", "G", "B", "E"].reverse() as Array<Note>;
export const HALF_STEP_DOWN: Array<Note> = [
  "D#",
  "G#",
  "C#",
  "F#",
  "A",
  "D#",
].reverse() as Array<Note>;

export const FRET_DOTS = [3, 5, 7, 9, 12, 15, 17, 19, 21];

export const store = getDefaultStore();
