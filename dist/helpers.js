import { NAV_KEY } from "./constants";
import { calcSeparation } from "./utils/calcSeparation";
var DISTANCE_TOLERANCE_PX = -2;
var SECONDARY_AXIS_DISTANCE_WEIGHT = 3;
export var estimateDistance = function (sourceRect, destRect, key, graspHorizontal, graspVertical) {
    var separation = calcSeparation(sourceRect, destRect);
    var horizontalSeparation = graspVertical ? 0 : separation.horizontal;
    var verticalSeparation = graspHorizontal ? 0 : separation.vertical;
    var result = Infinity;
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
