type ResolverFunc = (
  key: NAV_KEY,
  items: SpetsNavNode[],
  focusedNode: SpetsNavNode | null
) => Promise<HTMLElement | null> | HTMLElement | null;
export interface ISpetsNavOptions {
  noLeft?: boolean;
  noRight?: boolean;
  noUp?: boolean;
  noDown?: boolean;
  disabled?: boolean;
  onUp?: () => Promise<void> | void;
  onDown?: () => Promise<void> | void;
  onLeft?: () => Promise<void> | void;
  onRight?: () => Promise<void> | void;
  onNavFocus?: (element: HTMLElement) => Promise<void> | void;
  onNavBlur?: (element: HTMLElement) => Promise<void> | void;
  onAction?: () => Promise<void> | void;
  resolver?: ResolverFunc;
  defaultFocused?: boolean;
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
  items: { element: HTMLElement; options: ISpetsNavOptions }[];
  focus: (element: HTMLElement | null) => Promise<void>;
  focused: HTMLElement | null;
}
