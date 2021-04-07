import { MutableRefObject, useEffect, useRef } from "react";
import { estimateDistance } from "./helpers";
import { NAV_KEY, SpetsNavNode, SpetsNavRootState } from "./types";
import { SpetsNavContext } from "./SpetsNavContext";
import { defaultResolver } from "./resolvers";

type StateRef = MutableRefObject<SpetsNavRootState>;

const getNode = (ref: StateRef, el?: HTMLElement | null) =>
  ref.current.items.find(({ element }) => element === el) || null;

const getFocusedNode = (ref: StateRef) => getNode(ref, ref.current.focused);

const getItems = (ref: StateRef) => ref.current.items;

const focus = (ref: StateRef, item: HTMLElement | null) =>
  ref.current.focus(item);

const isMoveForbidden = (ref: StateRef, key: NAV_KEY) => {
  const options = getFocusedNode(ref)?.options;
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

const doBefore = async (ref: StateRef, key: NAV_KEY) => {
  const options = getFocusedNode(ref)?.options;
  switch (key) {
    case NAV_KEY.UP:
      return options?.onUp?.();
    case NAV_KEY.DOWN:
      return options?.onDown?.();
    case NAV_KEY.LEFT:
      return options?.onLeft?.();
    case NAV_KEY.RIGHT:
      return options?.onRight?.();
    default:
      break;
  }
};

export const SpetsNavRoot = ({ children }: any) => {
  const stateRef = useRef<SpetsNavRootState>({
    items: [],
    focused: null,
    focus: async (item: HTMLElement | null) => {
      const oldFocusedNode = getFocusedNode(stateRef);
      const newFocusedNode = getNode(stateRef, item);
      await oldFocusedNode?.options?.onNavBlur?.(oldFocusedNode?.element);
      await newFocusedNode?.options?.onNavFocus?.(newFocusedNode.element);
      if (oldFocusedNode) {
        oldFocusedNode.element.classList.remove("focused");
        console.log("blur", oldFocusedNode);
      }
      if (item) {
        item.classList.add("focused");
        console.log("focused", newFocusedNode);
      }
      stateRef.current.focused = item;
    },
  });

  useEffect(() => {
    const listener = async (event: KeyboardEvent) => {
      const now = performance.now();
      const key = event.code as NAV_KEY;
      if (!Object.values(NAV_KEY).includes(key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      if (!getFocusedNode(stateRef)) {
        await focus(stateRef, getItems(stateRef)[0]?.element);
        return;
      }

      if (isMoveForbidden(stateRef, key)) {
        console.log("Move forbidden", key);
        return;
      }

      await doBefore(stateRef, key);

      const resolve =
        getFocusedNode(stateRef)?.options?.resolver ?? defaultResolver;
      const nextFocusedElement = await resolve(
        key,
        getItems(stateRef),
        getFocusedNode(stateRef)
      );
      if (nextFocusedElement) {
        await focus(stateRef, nextFocusedElement);
      }
      console.log("duration", performance.now() - now);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [stateRef]);

  return (
    <SpetsNavContext.Provider value={stateRef}>
      {children}
    </SpetsNavContext.Provider>
  );
};
