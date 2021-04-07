import { NAV_KEY } from "./types";

const getRectCenter = (rect: DOMRect) => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
});

export const getRectDistance = (a: DOMRect, b: DOMRect) => {
  const centerA = getRectCenter(a);
  const centerB = getRectCenter(b);
  return {
    x: centerB.x - centerA.x,
    y: centerB.y - centerA.y,
  };
};

export const horizontalDistance = (a: DOMRect, b: DOMRect) =>
  Math.min(b.right - a.left, b.left - a.right);

export const verticalDistance = (a: DOMRect, b: DOMRect) =>
  Math.min(b.top - a.bottom, b.bottom - a.top);

const DISTANCE_TOLERANCE_PX = -2;
const SECONDARY_AXIS_DISTANCE_WEIGHT = 100;

export const estimateDistance = (
  sourceRect: DOMRect,
  destRect: DOMRect,
  key: NAV_KEY
): number => {
  const separation = {
    right: destRect.left - sourceRect.right,
    left: sourceRect.left - destRect.right,
    top: sourceRect.top - destRect.bottom,
    bottom: destRect.top - sourceRect.bottom,
    horizontal: 0,
    vertical: 0,
  };

  separation.horizontal =
    separation.right > 0
      ? separation.right
      : separation.left > 0
      ? separation.left
      : 0;

  separation.vertical =
    separation.top > 0
      ? separation.top
      : separation.bottom > 0
      ? separation.bottom
      : 0;

  let result = Infinity;
  switch (key) {
    case NAV_KEY.LEFT:
      if (separation.left >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.left +
          SECONDARY_AXIS_DISTANCE_WEIGHT * separation.vertical;
      }
      break;
    case NAV_KEY.RIGHT:
      if (separation.right >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.right +
          SECONDARY_AXIS_DISTANCE_WEIGHT * separation.vertical;
      }
      break;
    case NAV_KEY.UP:
      if (separation.top >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.top +
          SECONDARY_AXIS_DISTANCE_WEIGHT * separation.horizontal;
      }
      break;
    case NAV_KEY.DOWN:
      if (separation.bottom >= DISTANCE_TOLERANCE_PX) {
        result =
          separation.bottom +
          SECONDARY_AXIS_DISTANCE_WEIGHT * separation.horizontal;
      }
      break;
  }

  return result;
};
