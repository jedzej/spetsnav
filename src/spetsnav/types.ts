export interface ISpetsNavOptions {
  noLeft?: boolean;
  noRight?: boolean;
  noUp?: boolean;
  noDown?: boolean;
  disabled?: boolean;
  onNavFocus?: () => void;
  onNavBlur?: () => void;
  onMount?: () => void;
  onUnmount?: () => void;
  onAction?: () => void;
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