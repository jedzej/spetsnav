import { NAV_KEY } from "./constants";
import { calcSeparation } from "./utils/calcSeparation";

const DISTANCE_TOLERANCE_PX = -2;
const SECONDARY_AXIS_DISTANCE_WEIGHT = 3;

export const estimateDistance = (
  sourceRect: DOMRect,
  destRect: DOMRect,
  key: NAV_KEY,
  graspHorizontal: boolean,
  graspVertical: boolean
): number => {
  const separation = calcSeparation(sourceRect, destRect);
  const horizontalSeparation = graspVertical ? 0 : separation.horizontal;
  const verticalSeparation = graspHorizontal ? 0 : separation.vertical;

  let result = Infinity;
  switch (key) {
    case NAV_KEY.LEFT:
      if (separation.left >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.left + SECONDARY_AXIS_DISTANCE_WEIGHT * verticalSeparation;
      }
      break;
    case NAV_KEY.RIGHT:
      if (separation.right >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.right +
          SECONDARY_AXIS_DISTANCE_WEIGHT * verticalSeparation;
      }
      break;
    case NAV_KEY.UP:
      if (separation.top >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.top +
          SECONDARY_AXIS_DISTANCE_WEIGHT * horizontalSeparation;
      }
      break;
    case NAV_KEY.DOWN:
      if (separation.bottom >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.bottom +
          SECONDARY_AXIS_DISTANCE_WEIGHT * horizontalSeparation;
      }
      break;
  }

  return result;
};
