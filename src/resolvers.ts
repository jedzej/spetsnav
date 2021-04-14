import { estimateDistance } from "./helpers";
import { SpetsNavNode } from "./types";
import { NAV_KEY } from "./constants";

export const defaultResolver = async (
  key: NAV_KEY,
  nodes: SpetsNavNode[],
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

      const nextCandidates = nodes
        .map((node) => {
          const distance = estimateDistance(
            focusedRect,
            node.element.getBoundingClientRect(),
            key,
            !!node.options.graspHorizontal,
            !!node.options.graspVertical
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
