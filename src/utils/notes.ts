import { NOTES, type Note } from "../global";

export function getNoteName(openString: Note, fretNumber: number): Note {
  const openStringIndex = NOTES.indexOf(openString);
  if (openStringIndex === -1) {
    return openString;
  }

  const noteIndex = (openStringIndex + fretNumber) % NOTES.length;
  return NOTES[noteIndex] as Note;
}

export function getNextNoteName(note: Note, steps?: number) {
  const currentIndex = NOTES.indexOf(note);
  if (currentIndex === -1) {
    return note;
  }

  const stepCount = steps ?? 1;
  const nextIndex = (currentIndex + stepCount) % NOTES.length;
  return NOTES[nextIndex] as Note;
}

export function getPreviousNoteName(note: Note, steps?: number) {
  const currentIndex = NOTES.indexOf(note);
  if (currentIndex === -1) {
    return note;
  }

  const stepCount = steps ?? 1;
  const previousIndex = (currentIndex - stepCount + NOTES.length) % NOTES.length;
  return NOTES[previousIndex] as Note;
}
