import { useState } from "react";
import { SpetsNav } from "../spetsnav/SpetsNav";
import "./styles.css";

export const MountingDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        toggle visible
      </button>
      {visible && (
        <>
          <SpetsNav className="box" defaultFocused>
            mounting 1
          </SpetsNav>
          <SpetsNav className="box">mounting 2</SpetsNav>
        </>
      )}
    </div>
  );
};
