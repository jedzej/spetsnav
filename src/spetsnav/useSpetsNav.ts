import {
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { ISpetsNavOptions } from "./types";
import { SpetsNavContext } from "./SpetsNavContext";

export function useSpetsNav<T extends HTMLElement>(
  ref: RefObject<T>,
  options: ISpetsNavOptions = {}
) {
  const {
    current: { items, focus },
  } = useContext(SpetsNavContext);
  const optionsRef = useRef<ISpetsNavOptions>(options);

  useEffect(() => {
    if (ref.current) {
      items.push({ element: ref.current, options });
      return () => {
        items.splice(
          items.findIndex(({ element }) => element === ref.current),
          1
        );
      };
    }
  }, [ref, items, options]);

  useLayoutEffect(() => {
    if (optionsRef.current.defaultFocused && ref.current) {
      focus(ref.current);
    }
  }, [focus, ref]);
}
