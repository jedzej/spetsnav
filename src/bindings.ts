import { SpetsNavBinding } from "./types";
import { NAV_KEY } from "./constants";

export const defaultBinding: SpetsNavBinding = (handleKey) => {
  const listener = async (event: KeyboardEvent) => {
    let key: NAV_KEY;
    switch (event.code) {
      case "ArrowUp":
        key = NAV_KEY.UP;
        break;
      case "ArrowDown":
        key = NAV_KEY.DOWN;
        break;
      case "ArrowLeft":
        key = NAV_KEY.LEFT;
        break;
      case "ArrowRight":
        key = NAV_KEY.RIGHT;
        break;
      case "Enter":
        key = NAV_KEY.ENTER;
        break;
      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();

    await handleKey(key);
  };

  window.addEventListener("keydown", listener);
  return () => {
    window.removeEventListener("keydown", listener);
  };
};
