import { useEffect, useMemo, useState } from "react";
import { estimateDistance } from "./helpers";
import { ISpetsNavOptions, NAV_KEY } from "./types";
import { SpetsNavContext } from "./SpetsNavContext";

const isMoveForbidden = (
  options: ISpetsNavOptions | undefined,
  key: NAV_KEY
) => {
  switch (key) {
    case NAV_KEY.UP:
      return !!options?.noUp;
    case NAV_KEY.DOWN:
      return !!options?.noDown;
    case NAV_KEY.LEFT:
      return !!options?.noLeft;
    case NAV_KEY.RIGHT:
      return !!options?.noRight;
    default:
      break;
  }
};

export const SpetsNavRoot = ({ children }: any) => {
  const [items] = useState<
    { element: HTMLElement; options: ISpetsNavOptions }[]
  >([]);
  const [focused, setFocused] = useState<HTMLElement | null>(null);

  const getNode = (el?: HTMLElement | null) =>
    items.find(({ element }) => element === el);

  const switchFocus = (item: HTMLElement | null) => {
    const oldFocusedNode = getNode(focused);
    if (oldFocusedNode) {
      oldFocusedNode.element.classList.remove("focused");
      console.log("blur", oldFocusedNode);
      oldFocusedNode?.options?.onNavBlur?.();
    }
    const newFocusedNode = getNode(item);
    if (item) {
      item.classList.add("focused");
      console.log("focused", newFocusedNode);
      newFocusedNode?.options?.onNavFocus?.();
    }

    setFocused(item);
  };

  useEffect(() => {
    const enterListener = () => {
      getNode(focused)?.options?.onAction?.();
    };

    const listener = (event: KeyboardEvent) => {
      const now = performance.now();
      const key = event.code as NAV_KEY;
      if (!Object.values(NAV_KEY).includes(key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      const focusedNode = items.find(({ element }) => element === focused);

      console.log(focusedNode, focused, focusedNode?.options, items);

      if (!focused || !focusedNode) {
        switchFocus(items[0]?.element);
        return;
      }

      if (isMoveForbidden(focusedNode?.options, key)) {
        console.log("Move forbidden", key);
        return;
      }

      const resolveNav = () => {
        const focusedRect = focused.getBoundingClientRect();

        const refs = items
          .filter(
            ({ element, options }) => element !== focused && !options.disabled
          )
          .map(({ element }) => {
            const distance = estimateDistance(
              focusedRect,
              element.getBoundingClientRect(),
              key
            );
            // console.log(element, distance);
            return { element, distance };
          })
          .filter(({ distance }) => distance < Infinity)
          .sort((a, b) => a.distance - b.distance);

        if (refs[0]) {
          switchFocus(refs[0].element);
        }
      };

      switch (key) {
        case NAV_KEY.UP:
        case NAV_KEY.DOWN:
        case NAV_KEY.LEFT:
        case NAV_KEY.RIGHT:
          resolveNav();
          break;
        case NAV_KEY.ENTER:
          enterListener();
          break;
      }
      console.log("duration", performance.now() - now);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [focused, items, switchFocus]);

  const value = useMemo(() => ({ items, focus: switchFocus }), [
    items,
    switchFocus,
  ]);

  return (
    <SpetsNavContext.Provider value={value}>{children}</SpetsNavContext.Provider>
  );
};
