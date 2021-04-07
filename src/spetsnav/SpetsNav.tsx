import { CSSProperties, FunctionComponent, ReactNode, useRef } from "react";
import { ISpetsNavOptions } from "./types";
import { useSpetsNav } from "./useSpetsNav";

interface INavItemProps<T = any> extends ISpetsNavOptions {
  children: ReactNode;
  className?: string;
  component?: FunctionComponent;
  data?: T;
  style?: CSSProperties;
}

export const SpetsNav = ({
  children,
  className,
  data,
  component,
  style,
  ...options
}: INavItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const Component: any = component;
  useSpetsNav(ref, options);
  // console.log("render");
  const props = {
    "data-nav": data,
    ref,
    className,
    children,
    style,
  };
  return Component ? <Component {...props} /> : <div {...props} />;
};
