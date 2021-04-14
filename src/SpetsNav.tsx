import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useRef,
  memo,
  forwardRef,
} from "react";
import { ISpetsNavOptions } from "./types";
import { useSpetsNav } from "./hooks/useSpetsNav";

interface INavItemProps<T = any> extends ISpetsNavOptions {
  children: ReactNode;
  className?: string;
  component?: FunctionComponent;
  data?: T;
  style?: CSSProperties;
}

export const SpetsNav = memo(
  forwardRef<any, INavItemProps>(
    ({ children, className, component, style, ...options }, externalRef) => {
      const internalRef = useRef<HTMLElement>(null);
      const ref = (externalRef ?? internalRef) as any;
      const Component: any = component;
      useSpetsNav(ref, options);
      const props = {
        ref,
        className,
        children,
        style,
      };
      return Component ? <Component {...props} /> : <div {...props} />;
    }
  )
);
