import { estimateDistance } from "./helpers";
import { NAV_KEY, SpetsNavNode } from "./types";

export const defaultResolver = async (
  key: NAV_KEY,
  items: SpetsNavNode[],
  focusedNode: SpetsNavNode | null
): Promise<SpetsNavNode[]> => {
  if (!focusedNode) {
    return [];
  }

  switch (key) {
    case NAV_KEY.UP:
    case NAV_KEY.DOWN:
    case NAV_KEY.LEFT:
    case NAV_KEY.RIGHT:
      const focusedRect = focusedNode.element.getBoundingClientRect();

      const nextCandidates = items
        .filter((node) => node !== focusedNode && !node.options.disabled)
        .map((node) => {
          const distance = estimateDistance(
            focusedRect,
            node.element.getBoundingClientRect(),
            key
          );
          // console.log(element, distance);
          return { ...node, distance };
        })
        .filter(({ distance }) => distance < Infinity)
        .sort((a, b) => a.distance - b.distance);
      return nextCandidates;

    case NAV_KEY.ENTER:
      await focusedNode?.options?.onAction?.();
      break;
  }
  return [];
};
