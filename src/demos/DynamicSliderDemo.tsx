import { useState } from "react";
import { SpetsNav } from "../spetsnav/SpetsNav";
import "./styles.css";

const wait = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

export const DynamicSliderDemo = () => {
  const [items, setItems] = useState([1]);

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
          data={{ group: `slider-item`, key: item }}
          className="slider-item"
          key={item}
          onNavFocus={async (element) => {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }}
          onRight={async () => {
            if (i >= items.length - 2) {
              setItems((items) => [...items, items.length]);
            }
            await wait(200);
          }}
        >
          {item}
        </SpetsNav>
      ))}
    </div>
  );
};
