const TreeNode = ({ cx, cy, value, isHighlighted }) => {
  return (
      <g>
          <circle
              cx={cx}
              cy={cy}
              r={20}
              className={`tree-node ${isHighlighted ? "highlighted" : ""}`}
          />
          <text
              x={cx}
              y={cy}
              dy={5}
              textAnchor="middle"
              fontSize="12"
              className={`tree-text ${isHighlighted ? "highlighted" : ""}`}
          >
              {value}
          </text>
      </g>
  );
};

const Line = ({ x1, y1, x2, y2, isHighlighted }) => {
  return (
      <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={`tree-line ${isHighlighted ? "highlighted" : ""}`}
      />
  );
};

export { TreeNode, Line };
