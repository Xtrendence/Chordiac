import { NOTES, type Note, STANDARD_TUNING } from "../global";

export function getNoteName(openString: Note, fretNumber: number): Note {
  const openStringIndex = NOTES.indexOf(openString);
  if (openStringIndex === -1) {
    return openString;
  }

  const noteIndex = (openStringIndex + fretNumber) % NOTES.length;
  return NOTES[noteIndex] as Note;
}

export function getDistanceFromStandardTuning(tuning: Array<Note>) {
  return tuning.map((note, index) => {
    const standardNote = STANDARD_TUNING[index];
    const standardNoteIndex = NOTES.indexOf(standardNote);
    const noteIndex = NOTES.indexOf(note);
    const distance = (noteIndex - standardNoteIndex + NOTES.length) % NOTES.length;
    return distance > NOTES.length / 2 ? distance - NOTES.length : distance;
  });
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
