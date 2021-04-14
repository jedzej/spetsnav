import { SpetsNavNode } from "./types";
import { NAV_KEY } from "./constants";
export declare const defaultResolver: (key: NAV_KEY, nodes: SpetsNavNode[], focusedNode: SpetsNavNode | null) => Promise<SpetsNavNode[]>;
