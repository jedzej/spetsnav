import { useRef, useState } from "react";
import { SpetsNav } from "../spetsnav/SpetsNav";
import { useSpetsNavFocus } from "../spetsnav/useSpetsNavFocus";
import "./styles.css";

export const ImperativeFocusDemo = () => {
  const focus = useSpetsNavFocus();

  const refA = useRef<HTMLElement>(null);
  const refB = useRef<HTMLElement>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <SpetsNav className="box" ref={refA}>
        AAA
        <button
          onClick={() => {
            focus(() => refA.current);
          }}
        >
          focus AAA
        </button>
      </SpetsNav>
      <SpetsNav className="box" data="imperative-marker-b" ref={refB}>
        BBB
        <button
          onClick={() => {
            focus(
              (nodes) => {
               const node= nodes.find(
                  (node) => node.options.data === "imperative-marker-b"
                )
                console.log(nodes, node)
                return node?.element ?? null
              }
                
            );
          }}
        >
          focus AAA
        </button>
      </SpetsNav>
    </div>
  );
};
