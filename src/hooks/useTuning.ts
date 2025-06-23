import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type Note, STANDARD_TUNING } from "../global";

const tuningAtom = atomWithStorage<Array<Note>>("tuning", STANDARD_TUNING);
export const useTuning = () => useAtom(tuningAtom);
