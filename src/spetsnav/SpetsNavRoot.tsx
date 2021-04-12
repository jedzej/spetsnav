import { MutableRefObject, useEffect, useRef } from "react";
import { NAV_KEY, SpetsNavNode, SpetsNavRootState } from "./types";
import { SpetsNavContext } from "./SpetsNavContext";
import { defaultResolver } from "./resolvers";
import { noConcurrent } from "./utils/noConcurrent";

type StateRef = MutableRefObject<SpetsNavRootState>;

const getNode = (ref: StateRef, el?: HTMLElement | null) =>
  ref.current.nodes.find(({ element }) => element === el) || null;

const getFocusedNode = (ref: StateRef) => getNode(ref, ref.current.focused);

const getNodes = (ref: StateRef) => ref.current.nodes;

const isMoveForbidden = (node: SpetsNavNode | null, key: NAV_KEY) => {
  switch (key) {
    case NAV_KEY.UP:
      return !!node?.options?.disabledUp;
    case NAV_KEY.DOWN:
      return !!node?.options?.disabledDown;
    case NAV_KEY.LEFT:
      return !!node?.options?.disabledLeft;
    case NAV_KEY.RIGHT:
      return !!node?.options?.disabledRight;
    default:
      break;
  }
};

const doBefore = async (node: SpetsNavNode, key: NAV_KEY) => {
  const {
    beforeUp,
    beforeDown,
    beforeLeft,
    beforeRight,
    beforeAny,
  } = node.options;
  switch (key) {
    case NAV_KEY.UP:
      return (beforeUp ?? beforeAny)?.();
    case NAV_KEY.DOWN:
      return (beforeDown ?? beforeAny)?.();
    case NAV_KEY.LEFT:
      return (beforeLeft ?? beforeAny)?.();
    case NAV_KEY.RIGHT:
      return (beforeRight ?? beforeAny)?.();
    default:
      break;
  }
};

const doAfter = async (node: SpetsNavNode, key: NAV_KEY) => {
  const { afterUp, afterDown, afterLeft, afterRight, afterAny } = node.options;
  switch (key) {
    case NAV_KEY.UP:
      return (afterUp ?? afterAny)?.();
    case NAV_KEY.DOWN:
      return (afterDown ?? afterAny)?.();
    case NAV_KEY.LEFT:
      return (afterLeft ?? afterAny)?.();
    case NAV_KEY.RIGHT:
      return (afterRight ?? afterAny)?.();
    default:
      break;
  }
};

const focusAsk = async (
  stateRef: StateRef,
  element: HTMLElement | null,
  key?: NAV_KEY
): Promise<SpetsNavNode | null> => {
  const oldFocusedNode = getFocusedNode(stateRef);
  const newFocusedNode = getNode(stateRef, element);
  if (!newFocusedNode) {
    return null;
  }
  const result = newFocusedNode.options?.onFocusAsk
    ? await newFocusedNode.options?.onFocusAsk?.({
        key,
        current: newFocusedNode,
        previous: oldFocusedNode,
        nodes: getNodes(stateRef),
      })
    : true;
  if (result === true || result === newFocusedNode) {
    return newFocusedNode;
  } else if (result) {
    return focusAsk(stateRef, result.element, key);
  }
  return null;
};

const focusCommit = async (stateRef: StateRef, element: HTMLElement | null) => {
  const oldFocusedNode = getFocusedNode(stateRef);
  const newFocusedNode = getNode(stateRef, element);
  if (oldFocusedNode) {
    await oldFocusedNode.options?.onNavBlur?.(oldFocusedNode);
  }
  if (newFocusedNode) {
    await newFocusedNode.options?.onNavFocus?.(newFocusedNode);
  }
  if (oldFocusedNode) {
    oldFocusedNode.element.classList.remove("focused");
    console.log("blur", oldFocusedNode);
  }
  if (element) {
    element.classList.add("focused");
    console.log("focused", newFocusedNode);
  }
  stateRef.current.focused = element;
};

export const SpetsNavRoot: React.FC = ({ children }) => {
  const stateRef: StateRef = useRef<SpetsNavRootState>({
    nodes: [],
    focused: null,
    focus: async (item: HTMLElement | null) => {
      const node = await focusAsk(stateRef, item);
      if (node) {
        await focusCommit(stateRef, node.element);
      }
    },
  });

  useEffect(() => {
    const handleNavigation = noConcurrent(async (key: NAV_KEY) => {
      console.log("Handle navigation", key);
      if (!getFocusedNode(stateRef)) {
        const result = await focusAsk(
          stateRef,
          getNodes(stateRef)[0]?.element,
          key
        );
        if (result) {
          await focusCommit(stateRef, result.element);
        }
        return;
      }

      if (isMoveForbidden(getFocusedNode(stateRef), key)) {
        console.log("Move forbidden", key);
        return;
      }

      const focused = getFocusedNode(stateRef);

      if (focused) {
        await doBefore(focused, key);
      }

      const resolve =
        getFocusedNode(stateRef)?.options?.resolver ?? defaultResolver;

      const [...nextFocusCandidates] = await resolve(
        key,
        getNodes(stateRef),
        getFocusedNode(stateRef)
      );

      let candidate = nextFocusCandidates.shift();
      while (candidate) {
        const nextFocus = await focusAsk(stateRef, candidate.element, key);
        if (nextFocus) {
          await focusCommit(stateRef, nextFocus.element);
          await doAfter(nextFocus, key);
          return;
        }
        candidate = nextFocusCandidates.shift();
      }
    });

    const listener = async (event: KeyboardEvent) => {
      const now = performance.now();
      const key = event.code as NAV_KEY;
      if (!Object.values(NAV_KEY).includes(key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      await handleNavigation(key);

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
