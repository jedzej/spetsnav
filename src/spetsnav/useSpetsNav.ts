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
  const { items, focus } = useContext(SpetsNavContext);
  const optionsRef = useRef<ISpetsNavOptions>(options);

  const { current } = ref;

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
  }, [current, items, options]);

  useLayoutEffect(() => {
    if (optionsRef.current.defaultFocused && ref.current) {
      focus(ref.current);
    }
  }, []);

  useEffect(() => {
    optionsRef.current.onMount?.();

    return () => {
      optionsRef.current.onUnmount?.();
    };
    // eslint-disable-next-line
  }, []);
}
