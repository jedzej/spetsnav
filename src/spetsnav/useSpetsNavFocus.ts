import { useCallback, useContext } from "react";
import { SpetsNavNode } from "./types";
import { SpetsNavContext } from "./SpetsNavContext";

export function useSpetsNavFocus() {
  const spetsNavRef = useContext(SpetsNavContext);

  return useCallback(
    (
      predicate: (
        nodes: SpetsNavNode[],
        focused: HTMLElement | null
      ) => HTMLElement | null
    ) => {
      const candidate = predicate(
        spetsNavRef.current.items,
        spetsNavRef.current.focused
      );
      if (candidate) {
        spetsNavRef.current.focus(candidate);
      }
    },
    [spetsNavRef]
  );
}
