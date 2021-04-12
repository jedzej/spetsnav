import { SpetsNavRoot } from "./spetsnav";
import { GridDemo } from "./demos/GridDemo";
import { SliderDemo } from "./demos/SliderDemo";
import { DynamicSliderDemo } from "./demos/DynamicSliderDemo";
import { CircleDemo } from "./demos/CircleDemo";
import { ImperativeFocusDemo } from "./demos/ImperativeFocusDemo";
import { MountingDemo } from "./demos/MountingDemo";

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
