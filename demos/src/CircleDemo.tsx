import { SpetsNav } from "spetsnav";
import "./styles.css";

const ITEMS_COUNT = 8;

export const CircleDemo = () => {
  const angles = Array.from(Array(ITEMS_COUNT).keys()).map(
    (i) => (i / ITEMS_COUNT) * Math.PI * 2
  );
  return (
    <div style={{ position: "relative", height: "220px" }}>
      {angles.map((angle, i) => (
        <SpetsNav
          className="circle-item"
          style={{
            top: `${100 + Math.sin(angle) * 80}px`,
            left: `${100 + Math.cos(angle) * 80}px`,
          }}
        >
          {i}
        </SpetsNav>
      ))}
    </div>
  );
};
