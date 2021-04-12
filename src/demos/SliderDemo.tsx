import { useMemo, useState } from "react";
import { defaultResolver } from "../spetsnav/resolvers";
import { SpetsNav } from "../spetsnav/SpetsNav";
import "./styles.css";

const items = ["A", "B", "C", "D"];

export const SliderDemo = () => {
  const [position, setPosition] = useState(0);

  const itemz = useMemo(() => {
    const newItems = [...items];
    const moved = newItems.splice(0, position);
    return [...newItems, ...moved];
  }, [position]);

  return (
    <div>
      {itemz.map((item, i) => (
        <SpetsNav
          className="slider-item"
          key={item}
          data={{
            group: "slider-item",
            pos: i,
          }}
          resolver={defaultResolver}
          graspVertical
          onFocusAsk={({ previous, nodes }) => {
            if (previous?.options.data?.group !== "slider-item") {
              return (
                nodes
                  .filter(
                    ({ options }) => options.data?.group === "slider-item"
                  )
                  .sort((a, b) => a.options.data.pos - b.options.data.pos)[1] ??
                null
              );
            }
            return true;
          }}
          beforeLeft={async () => {
            setPosition((p) => (p - 1 + items.length) % items.length);
            // await wait(0);
          }}
          afterRight={async () => {
            // await wait(1000);
            setPosition((p) => (p + 1) % items.length);
            // await wait(0);
          }}
        >
          {item}
        </SpetsNav>
      ))}
    </div>
  );
};
