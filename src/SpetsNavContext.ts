import { createContext } from "react";
import { SpetsNavRootState } from "./types";

export const SpetsNavContext = createContext<{ current: SpetsNavRootState }>({
  current: {
    nodes: [],
    focus: () => Promise.resolve(),
    focused: null,
    register: () => () => {},
    focusedClass: "focused",
  },
});
