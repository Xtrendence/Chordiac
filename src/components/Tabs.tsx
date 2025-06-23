import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { FaTrash } from "react-icons/fa6";
import { isNullish } from "remeda";
import { NUMBER_OF_FRETS, NUMBER_OF_STRINGS, store } from "../global";

const tabsAtom = atomWithStorage<Array<Record<number, number | undefined>>>("tabs", []);

export const useTabs = () => useAtom(tabsAtom);

export function upsertTab(
  stringIndex: number,
  tab: Record<number, number | undefined>,
  index?: number,
) {
  store.set(tabsAtom, (prevTabs) => {
    if (isNullish(index)) {
      return [...prevTabs, tab];
    }
    return prevTabs.map((t, i) => {
      if (i === index) {
        return { ...t, [stringIndex]: tab[stringIndex] };
      }
      return t;
    });
  });
}

function Line() {
  return <div className="w-[32.2px] even:ml-[-2px] h-0.25 bg-neutral-500" />;
}

function Space() {
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: NUMBER_OF_STRINGS }, (_, stringIndex) => (
        <div key={stringIndex.toString()} className="flex items-center justify-center h-8">
          <Line />
        </div>
      ))}
    </div>
  );
}

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
  const [_, setTabs] = useTabs();
  return (
    <Dropdown
      isOpen={menuId !== undefined && menuId === id}
      onOpenChange={(open) => {
        if (open) {
          setMenuId(undefined);
        }
      }}
      placement="right"
      showArrow
      backdrop="opaque"
    >
      <DropdownTrigger>{children}</DropdownTrigger>
      <ClickAwayListener onClickAway={() => setMenuId(undefined)}>
        <DropdownMenu variant="bordered">
          <DropdownItem
            key={"delete"}
            startContent={<FaTrash />}
            color="danger"
            onClick={() => {
              setTabs((prev) => prev.filter((_, index) => index !== id));
              setMenuId(undefined);
            }}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </ClickAwayListener>
    </Dropdown>
  );
}

export function Tabs() {
  const [tabs] = useTabs();
  const [input, setInput] = useState<Record<number, number | undefined>>({});
  const [menuId, setMenuId] = useState<number | undefined>();

  return (
    <div className="flex flex-col gap-2 mx-4">
      <div className="flex flex-wrap">
        {tabs.map((tab, index) => (
          <div key={index.toString()} className="flex items-center mb-8">
            {index === 0 && <Space />}
            <Menu id={index} menuId={menuId} setMenuId={setMenuId}>
              <div
                className="flex flex-col items-center gap-2 aria-expanded:scale-[1] cursor-pointer hover:opacity-70 transition-opacity"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuId(index);
                }}
              >
                {Array.from({ length: NUMBER_OF_STRINGS }, (_, stringIndex) => (
                  <div
                    key={stringIndex.toString()}
                    className="flex font-bold items-center justify-center h-8 w-[32.2px]"
                  >
                    {tab[stringIndex] !== undefined ? (
                      <span className="text-neutral-300 text-sm bg-neutral-800 px-2 rounded-xl py-1">
                        {tab[stringIndex]}
                      </span>
                    ) : (
                      <Line />
                    )}
                  </div>
                ))}
              </div>
            </Menu>
            <Space />
          </div>
        ))}
        <div className="flex flex-col gap-2 ml-2">
          {Array.from({ length: NUMBER_OF_STRINGS }, (_, stringIndex) => (
            <Input
              key={stringIndex.toString()}
              placeholder={"-"}
              className="w-10"
              style={{ textAlign: "center" }}
              size="sm"
              value={input?.[stringIndex]?.toString() ?? ""}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                  upsertTab(stringIndex, input);
                  setInput({});
                }
              }}
              onChange={(e) => {
                const fret = Number.parseInt(e.target.value);
                if (e.target.value === "") {
                  setInput((prev) => ({
                    ...prev,
                    [stringIndex]: undefined,
                  }));
                  return;
                }

                if (!Number.isNaN(fret) && fret >= 0 && fret < NUMBER_OF_FRETS) {
                  setInput((prev) => ({
                    ...prev,
                    [stringIndex]: fret,
                  }));
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
