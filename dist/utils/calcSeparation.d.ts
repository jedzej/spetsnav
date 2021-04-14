interface SpacialSeparation {
    right: number;
    left: number;
    top: number;
    bottom: number;
    horizontal: number;
    vertical: number;
}
export declare const calcSeparation: (sourceRect: DOMRect, destRect: DOMRect) => SpacialSeparation;
export {};
