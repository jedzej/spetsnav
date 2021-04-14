import { RefObject, useContext, useLayoutEffect, useRef } from "react";
import { ISpetsNavOptions } from "../types";
import { SpetsNavContext } from "../SpetsNavContext";

export function useSpetsNav<T extends HTMLElement>(
  ref: RefObject<T>,
  options: ISpetsNavOptions = {}
) {
  const { current: spetsNav } = useContext(SpetsNavContext);
  const optionsRef = useRef<ISpetsNavOptions>(options);

  useLayoutEffect(() => {
    if (ref.current) {
      return spetsNav.register({ element: ref.current, options });
    }
  }, [ref, spetsNav, options]);

  useLayoutEffect(() => {
    if (optionsRef.current.defaultFocused && ref.current) {
      spetsNav.focus(ref.current);
      return () => {
        spetsNav.focus(null);
      };
    }
  }, [spetsNav, ref]);
}
