import { createContext } from "react";
import { ISpetsNavOptions } from "./types";

export const SpetsNavContext = createContext<{
  items: { element: HTMLElement; options: ISpetsNavOptions }[];
  focus: (item: HTMLElement) => void;
}>({
  items: [],
  focus: () => {},
});
