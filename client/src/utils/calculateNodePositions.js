const LEVEL_HEIGHT = 80;

const calculateNodePositions = (
  node,
  depth = 0,
  minX = 0,
  maxX = 1000,
  y = 50,
  positions = []
) => {
  if (!node) return positions;

  const x = (minX + maxX) / 2;
  positions.push({ x, y, value: node.value, count: node.count, node });

  if (node.left) {
    calculateNodePositions(
      node.left,
      depth + 1,
      minX,
      x,
      y + LEVEL_HEIGHT,
      positions
    );
  }
  if (node.right) {
    calculateNodePositions(
      node.right,
      depth + 1,
      x,
      maxX,
      y + LEVEL_HEIGHT,
      positions
    );
  }

  return positions;
};

export default calculateNodePositions;
