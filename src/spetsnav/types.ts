type ResolverFunc = (
  key: NAV_KEY,
  items: SpetsNavNode[],
  focusedNode: SpetsNavNode | null
) => Promise<SpetsNavNode[]>;

type BeforeAfterCallback = () => Promise<void> | void;
export interface ISpetsNavOptions<T = any> {
  disabledLeft?: boolean;
  disabledRight?: boolean;
  disabledUp?: boolean;
  disabledDown?: boolean;
  disabled?: boolean;
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
  onFocusAsk?: (params: {
    key?: NAV_KEY;
    current: SpetsNavNode;
    previous: SpetsNavNode | null;
    nodes: SpetsNavNode[];
  }) => Promise<SpetsNavNode | null | true> | SpetsNavNode | null | true;
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
  items: SpetsNavNode[];
  focus: (element: HTMLElement | null) => Promise<void>;
  focused: HTMLElement | null;
}
