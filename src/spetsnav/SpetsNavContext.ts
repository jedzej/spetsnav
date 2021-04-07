import { createContext } from "react";
import { SpetsNavRootState } from "./types";

export const SpetsNavContext = createContext<{ current: SpetsNavRootState }>({
  current: { items: [], focus: () => Promise.resolve(), focused: null },
});
