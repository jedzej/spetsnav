import { useState } from "react";
import { defaultResolver } from "../spetsnav/resolvers";
import { SpetsNav } from "../spetsnav/SpetsNav";
import { NAV_KEY } from "../spetsnav/types";
import "./styles.css";

export const GridDemo = () => {
  const [focusCounter, setFocusCounter] = useState(0);
  const [blurCounter, setBlurCounter] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <SpetsNav className="box">normal</SpetsNav>
      <SpetsNav className="box" defaultFocused>
        default
      </SpetsNav>
      <SpetsNav
        className="box"
        resolver={(key, items, focusedNode) =>
          key === NAV_KEY.LEFT ? [] : defaultResolver(key, items, focusedNode)
        }
      >
        disabledLeft
      </SpetsNav>
      <SpetsNav
        className="box"
        resolver={(key, items, focusedNode) =>
          key === NAV_KEY.RIGHT ? [] : defaultResolver(key, items, focusedNode)
        }
      >
        disabledRight
      </SpetsNav>
      <SpetsNav
        className="box"
        resolver={(key, items, focusedNode) =>
          key === NAV_KEY.DOWN ? [] : defaultResolver(key, items, focusedNode)
        }
      >
        disabledDown
      </SpetsNav>
      <SpetsNav
        className="box"
        resolver={(key, items, focusedNode) =>
          key === NAV_KEY.UP ? [] : defaultResolver(key, items, focusedNode)
        }
      >
        disabledUp
      </SpetsNav>
      <SpetsNav
        className="box"
        onNavFocus={() => setFocusCounter((v) => v + 1)}
        onNavBlur={() => setBlurCounter((v) => v + 1)}
      >
        onNavFocus: {focusCounter}
        <br />
        onNavBlur: {blurCounter}
      </SpetsNav>
      <SpetsNav className="box" onFocusAsk={() => false}>
        disabled
      </SpetsNav>
      <SpetsNav
        className="box"
        onAction={() => {
          window.alert("Action");
        }}
      >
        press enter
      </SpetsNav>
    </div>
  );
};
