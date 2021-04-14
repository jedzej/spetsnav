import { useRef } from "react";
import { SpetsNav, useSpetsNavFocus } from "spetsnav";
import "./styles.css";

export const ImperativeFocusDemo = () => {
  const focus = useSpetsNavFocus();

  const refA = useRef<HTMLElement>(null);

  return (
    <div>
      <SpetsNav className="imperative-box" ref={refA}>
        imperative focus with ref
      </SpetsNav>
      <SpetsNav className="imperative-box" data="imperative-marker-b">
        imperative focus with predicate
      </SpetsNav>
      <button
        onClick={() => {
          focus(() => refA.current);
        }}
      >
        focus with ref
      </button>
      <button
        onClick={() => {
          focus(
            (nodes) =>
              nodes.find((node) => node.options.data === "imperative-marker-b")
                ?.element ?? null
          );
        }}
      >
        focus with predicate
      </button>
    </div>
  );
};
