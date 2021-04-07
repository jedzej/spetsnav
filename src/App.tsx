import "./styles.css";
import { SpetsNavRoot } from "./spetsnav/SpetsNavRoot";
import { SpetsNav } from "./spetsnav/SpetsNav";
import { GridDemo } from "./demos/GridDemo";
import { SliderDemo } from "./demos/SliderDemo";
import { DynamicSliderDemo } from "./demos/DynamicSliderDemo";

export default function App() {
  return (
    <div className="App">
      <SpetsNavRoot>
        <GridDemo />
        <SliderDemo />
        <DynamicSliderDemo />
        <div style={{ position: "relative", height: "200px" }}>
          <SpetsNav
            data="XD"
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
        {/* <DynamicItems /> */}
      </SpetsNavRoot>
    </div>
  );
}
