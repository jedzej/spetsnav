import { useContext, useLayoutEffect, useRef } from "react";
import { SpetsNavContext } from "../SpetsNavContext";
export function useSpetsNav(ref, options) {
    if (options === void 0) { options = {}; }
    var spetsNav = useContext(SpetsNavContext).current;
    var optionsRef = useRef(options);
    useLayoutEffect(function () {
        if (ref.current) {
            return spetsNav.register({ element: ref.current, options: options });
        }
    }, [ref, spetsNav, options]);
    useLayoutEffect(function () {
        if (optionsRef.current.defaultFocused && ref.current) {
            spetsNav.focus(ref.current);
            return function () {
                spetsNav.focus(null);
            };
        }
    }, [spetsNav, ref]);
}
