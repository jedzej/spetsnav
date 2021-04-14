import { useEffect, useRef, useState } from "react";
import { useSpetsNav } from "spetsnav";
import "./styles.css";

const DynamicItem = ({ children, x, y }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  useSpetsNav(ref);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: "30px",
        height: "30px",
        textAlign: "center",
        borderRadius: "100px",
        backgroundColor: "yellow",
      }}
    >
      {children}
    </div>
  );
};

const generatePositions = (items: string[]) =>
  Object.fromEntries(
    items.map((item) => [
      item,
      { x: Math.random() * 250, y: Math.random() * 200 },
    ])
  );

const items = ["A", "B", "C", "D", "E", "F", "G"];

export const DynamicItems = () => {
  const [pos, setPos] = useState<{ [key: string]: { x: number; y: number } }>(
    () => generatePositions(items)
  );

  useEffect(() => {
    const interval = setInterval(() => setPos(generatePositions(items)), 3000);
    return () => clearInterval(interval);
  }, []);
  console.log(pos);

  return (
    <div style={{ position: "relative", height: "250px", background: "green" }}>
      {items.map((item) => (
        <DynamicItem
          key={item}
          x={`${pos[item]?.x ?? 0}px`}
          y={`${pos[item]?.y ?? 0}px`}
        >
          {item}
        </DynamicItem>
      ))}
    </div>
  );
};
