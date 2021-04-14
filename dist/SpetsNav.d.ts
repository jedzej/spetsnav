import React, { CSSProperties, FunctionComponent, ReactNode } from "react";
import { ISpetsNavOptions } from "./types";
interface INavItemProps<T = any> extends ISpetsNavOptions {
    children: ReactNode;
    className?: string;
    component?: FunctionComponent;
    data?: T;
    style?: CSSProperties;
}
export declare const SpetsNav: React.MemoExoticComponent<React.ForwardRefExoticComponent<INavItemProps<any> & React.RefAttributes<any>>>;
export {};
