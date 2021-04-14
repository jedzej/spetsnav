import { createContext } from "react";
export var SpetsNavContext = createContext({
    current: {
        nodes: [],
        focus: function () { return Promise.resolve(); },
        focused: null,
        register: function () { return function () { }; },
        focusedClass: "focused",
    },
});
