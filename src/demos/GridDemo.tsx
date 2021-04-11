import { useState } from "react";
import { SpetsNav } from "../spetsnav/SpetsNav";
import "./styles.css";

export const GridDemo = () => {
  const [focusCounter, setFocusCounter] = useState(0);
  const [blurCounter, setBlurCounter] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <SpetsNav className="box">normal</SpetsNav>
      <SpetsNav className="box" defaultFocused>
        default
      </SpetsNav>
      <SpetsNav className="box" disabledLeft>
        disabledLeft
      </SpetsNav>
      <SpetsNav className="box" disabledRight>
        disabledRight
      </SpetsNav>
      <SpetsNav className="box" disabledDown>
        disabledDown
      </SpetsNav>
      <SpetsNav className="box" disabledUp>
        disabledUp
      </SpetsNav>
      <SpetsNav
        className="box"
        onNavFocus={() => setFocusCounter((v) => v + 1)}
        onNavBlur={() => setBlurCounter((v) => v + 1)}
      >
        onNavFocus: {focusCounter}
        <br />
        onNavBlur: {blurCounter}
      </SpetsNav>
      <SpetsNav className="box" disabled>
        disabled
      </SpetsNav>
      <SpetsNav
        className="box"
        onAction={() => {
          window.alert("Action");
        }}
      >
        press enter
      </SpetsNav>
    </div>
  );
};
