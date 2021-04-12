import { useCallback, useState } from "react";
import { SpetsNav, SpetsNavNode } from "../spetsnav";
import "./styles.css";

const wait = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

export const DynamicSliderDemo = () => {
  const [items, setItems] = useState([0, 1, 2, 3]);

  const onNavFocus = useCallback(async ({ element }: SpetsNavNode) => {
    element.scrollIntoView();
  }, []);

  return (
    <div
      style={{
        overflowX: "scroll",
        display: "flex",
        width: "100%",
        flexWrap: "nowrap",
        flexDirection: "row",
      }}
    >
      {items.map((item, i) => (
        <SpetsNav
          key={item}
          className="slider-item"
          onNavFocus={onNavFocus}
          afterRight={async () => {
            if (i >= items.length - 2) {
              await wait(200);
              setItems((items) => [...items, items.length]);
            }
          }}
        >
          {item}
        </SpetsNav>
      ))}
    </div>
  );
};
