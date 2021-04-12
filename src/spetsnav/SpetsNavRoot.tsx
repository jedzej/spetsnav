import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { SpetsNavNode, SpetsNavRootProps, SpetsNavRootState } from "./types";
import { NAV_KEY } from "./constants";
import { SpetsNavContext } from "./SpetsNavContext";
import { defaultResolver } from "./resolvers";
import { noConcurrent } from "./utils/noConcurrent";
import { defaultBinding } from "./bindings";

type StateRef = MutableRefObject<SpetsNavRootState>;

const getNode = (ref: StateRef, el?: HTMLElement | null) =>
  ref.current.nodes.find(({ element }) => element === el) || null;

const getFocusedNode = (ref: StateRef) => getNode(ref, ref.current.focused);

const getNodes = (ref: StateRef) => ref.current.nodes;

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
    oldFocusedNode.element.classList.remove(stateRef.current.focusedClass);
  }
  if (element) {
    element.classList.add(stateRef.current.focusedClass);
  }
  stateRef.current.focused = element;
};

export const SpetsNavRoot = ({
  children,
  focusedClass = "focused",
  keyBinding = defaultBinding,
}: SpetsNavRootProps) => {
  const stateRef: StateRef = useRef<SpetsNavRootState>({
    nodes: [],
    focused: null,
    focus: async (item: HTMLElement | null) => {
      const node = await focusAsk(stateRef, item);
      if (node) {
        await focusCommit(stateRef, node.element);
      }
    },
    register: (node) => {
      const nodes = getNodes(stateRef);
      nodes.push(node);
      return () => {
        if (getFocusedNode(stateRef) === node) {
          // stateRef.current.focused = null;
          console.log("AAAAA")
        }
        nodes.splice(
          nodes.findIndex((n) => n === node),
          1
        );
      };
    },
    focusedClass,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKey = useCallback(
    noConcurrent(async (key: NAV_KEY) => {
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
    }),
    []
  );

  useEffect(() => {
    keyBinding(handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SpetsNavContext.Provider value={stateRef}>
      {children}
    </SpetsNavContext.Provider>
  );
};
