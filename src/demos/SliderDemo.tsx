import { useMemo, useState } from "react";
import { SpetsNav } from "../spetsnav/SpetsNav";
import "./styles.css";

const items = ["A", "B", "C", "D"];

const wait = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

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
          disabled={i === 0}
          onLeft={async () => {
            setPosition((p) => (p - 1 + items.length) % items.length);
            await wait(0);
          }}
          onRight={async () => {
            // await wait(1000);
            setPosition((p) => (p + 1) % items.length);
            await wait(0);
          }}
        >
          {item}
        </SpetsNav>
      ))}
    </div>
  );
};
