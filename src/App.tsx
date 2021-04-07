import { forwardRef, useState } from "react";
import "./styles.css";
import { SpetsNavRoot } from "./spetsnav/SpetsNavRoot";
import { SpetsNav } from "./spetsnav/SpetsNav";
import { DynamicItems } from "./demos/DynamicItems";

const GridBox = forwardRef(({ children, ...props }: any, ref) => {
  return (
    <div ref={ref} {...props} className="box">
      {children}
    </div>
  );
});

export default function App() {
  const [focusCounter, setFocusCounter] = useState(0);
  const [blurCounter, setBlurCounter] = useState(0);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SpetsNavRoot>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <SpetsNav component={GridBox}>normal</SpetsNav>
          <SpetsNav component={GridBox} defaultFocused>
            default
          </SpetsNav>
          <SpetsNav component={GridBox} noLeft>
            noLeft
          </SpetsNav>
          <SpetsNav component={GridBox} noRight>
            noRight
          </SpetsNav>
          <SpetsNav component={GridBox} noDown>
            noDown
          </SpetsNav>
          <SpetsNav component={GridBox} noUp>
            noUp
          </SpetsNav>
          <SpetsNav
            component={GridBox}
            onNavFocus={() => setFocusCounter((v) => v + 1)}
            onNavBlur={() => setBlurCounter((v) => v + 1)}
          >
            onNavFocus: {focusCounter}
            <br />
            onNavBlur: {blurCounter}
          </SpetsNav>
          <SpetsNav component={GridBox} disabled>
            disabled
          </SpetsNav>
          <SpetsNav
            component={GridBox}
            onAction={() => {
              window.alert("Action");
            }}
          >
            press enter
          </SpetsNav>
        </div>
        <div style={{ position: "relative", height: "200px" }}>
          <SpetsNav
            data="XD"
            component={GridBox}
            style={{
              display: "block",
              position: "absolute",
              left: 20,
              top: 20,
            }}
          >
            abs1
          </SpetsNav>
          <SpetsNav
            data="XD"
            component={GridBox}
            noRight
            style={{
              display: "block",
              position: "absolute",
              left: 120,
              top: 40,
            }}
          >
            abs2
          </SpetsNav>
        </div>
        <DynamicItems />
      </SpetsNavRoot>
    </div>
  );
}
