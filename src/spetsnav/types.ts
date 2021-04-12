import { ReactNode } from "react";

type ResolverFunc = (
  key: NAV_KEY,
  items: SpetsNavNode[],
  focusedNode: SpetsNavNode | null
) => Promise<SpetsNavNode[]> | SpetsNavNode[];

type BeforeAfterCallback = () => Promise<void> | void;
export interface ISpetsNavOptions<T = any> {
  beforeUp?: BeforeAfterCallback;
  beforeDown?: BeforeAfterCallback;
  beforeLeft?: BeforeAfterCallback;
  beforeRight?: BeforeAfterCallback;
  beforeAny?: BeforeAfterCallback;
  afterUp?: BeforeAfterCallback;
  afterDown?: BeforeAfterCallback;
  afterLeft?: BeforeAfterCallback;
  afterRight?: BeforeAfterCallback;
  afterAny?: BeforeAfterCallback;
  graspVertical?: boolean;
  graspHorizontal?: boolean;
  onFocusAsk?: (params: {
    key?: NAV_KEY;
    current: SpetsNavNode;
    previous: SpetsNavNode | null;
    nodes: SpetsNavNode[];
  }) => Promise<SpetsNavNode | boolean> | SpetsNavNode | boolean;
  onNavFocus?: (node: SpetsNavNode) => Promise<void> | void;
  onNavBlur?: (node: SpetsNavNode) => Promise<void> | void;
  onAction?: () => Promise<void> | void;
  resolver?: ResolverFunc;
  defaultFocused?: boolean;
  data?: T;
}

export interface SpetsNavNode {
  element: HTMLElement;
  options: ISpetsNavOptions;
}

export enum NAV_KEY {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  ENTER = "Enter",
}

export interface SpetsNavRootState {
  nodes: SpetsNavNode[];
  focus: (element: HTMLElement | null) => Promise<void>;
  focused: HTMLElement | null;
  register: (node: SpetsNavNode) => () => void;
  focusedClass: string;
}

export interface SpetsNavRootProps {
  focusedClass?: string;
  children?: ReactNode;
}
