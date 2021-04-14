import { SpetsNavRoot } from "spetsnav";
import { GridDemo } from "./GridDemo";
import { SliderDemo } from "./SliderDemo";
import { DynamicSliderDemo } from "./DynamicSliderDemo";
import { CircleDemo } from "./CircleDemo";
import { ImperativeFocusDemo } from "./ImperativeFocusDemo";
import { MountingDemo } from "./MountingDemo";

export default function App() {
  return (
    <div>
      <SpetsNavRoot>
        <GridDemo />
        <SliderDemo />
        <DynamicSliderDemo />
        <CircleDemo />
        <ImperativeFocusDemo />
        <MountingDemo />
        {/* <DynamicItems /> */}
      </SpetsNavRoot>
    </div>
  );
}
