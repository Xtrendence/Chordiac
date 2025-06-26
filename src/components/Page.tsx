import { Guitar } from "./Guitar";
import { Tabs } from "./Tabs";

export function Page() {
  return (
    <div className="flex w-[100dvw] max-w-[100dvw] overflow-x-hidden min-h-[100dvh] justify-start items-center flex-col gap-1">
      <Guitar />
      <Tabs />
    </div>
  );
}
