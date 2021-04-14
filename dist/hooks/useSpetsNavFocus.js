import { useCallback, useContext } from "react";
import { SpetsNavContext } from "../SpetsNavContext";
export function useSpetsNavFocus() {
    var spetsNavRef = useContext(SpetsNavContext);
    return useCallback(function (predicate) {
        var candidate = predicate(spetsNavRef.current.nodes, spetsNavRef.current.focused);
        if (candidate) {
            spetsNavRef.current.focus(candidate);
        }
    }, [spetsNavRef]);
}
