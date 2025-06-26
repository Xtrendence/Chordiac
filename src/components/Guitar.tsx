import { Card, CardBody } from "@heroui/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { FaRedoAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { NUMBER_OF_STRINGS, STANDARD_TUNING } from "../global";
import { useTuning } from "../hooks/useTuning";
import { getNextNoteName, getPreviousNoteName } from "../utils/notes";
import { GuitarString } from "./GuitarString";

function Menu({
  children,
  id,
  menuId,
  setMenuId,
}: {
  children: React.ReactNode;
  id: number;
  menuId: number | undefined;
  setMenuId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const [tuning, setTuning] = useTuning();

  return (
    <Dropdown
      isOpen={menuId !== undefined && menuId === id}
      onOpenChange={(open) => {
        if (open) {
          setMenuId(undefined);
        }
      }}
      placement="bottom-start"
      showArrow
      backdrop="opaque"
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <ClickAwayListener onClickAway={() => setMenuId(undefined)}>
        <DropdownMenu variant="bordered">
          <DropdownItem
            key={"sharpen"}
            startContent={<FaPlus />}
            onClick={() => {
              const currentNote = tuning[id];
              const nextNote = getNextNoteName(currentNote);
              setTuning((prev) => {
                const newTuning = [...prev];
                newTuning[id] = nextNote;
                return newTuning;
              });
              setMenuId(undefined);
            }}
          >
            Sharpen
          </DropdownItem>
          <DropdownItem
            key={"flatten"}
            startContent={<FaMinus />}
            onClick={() => {
              const currentNote = tuning[id];
              const previousNote = getPreviousNoteName(currentNote);
              setTuning((prev) => {
                const newTuning = [...prev];
                newTuning[id] = previousNote;
                return newTuning;
              });
              setMenuId(undefined);
            }}
          >
            Flatten
          </DropdownItem>
          <DropdownItem
            key={"reset"}
            startContent={<FaRedoAlt />}
            onClick={() => {
              setTuning(STANDARD_TUNING);
              setMenuId(undefined);
            }}
          >
            Reset
          </DropdownItem>
        </DropdownMenu>
      </ClickAwayListener>
    </Dropdown>
  );
}

export function Guitar() {
  const [menuId, setMenuId] = useState<number | undefined>(undefined);

  return (
    <Card className="m-4 mt-4 p-2 overflow-visible">
      <CardBody>
        <GuitarString number={-1} />
        {Array.from({ length: NUMBER_OF_STRINGS }, (_, index) => (
          <Menu key={index.toString()} id={index} menuId={menuId} setMenuId={setMenuId}>
            <div
              className="aria-expanded:scale-[1]"
              onContextMenu={(e) => {
                e.preventDefault();
                setMenuId(index);
              }}
            >
              <GuitarString number={index} />
            </div>
          </Menu>
        ))}
      </CardBody>
    </Card>
  );
}
