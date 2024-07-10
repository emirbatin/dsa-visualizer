const TreeNode = ({ cx, cy, value, isHighlighted }) => {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={20}
          stroke={isHighlighted ? "orange" : "black"}
          strokeWidth="2"
          fill={isHighlighted ? "orange" : "white"}
        />
        <text x={cx} y={cy} dy={5} textAnchor="middle" fontSize="12" fill={isHighlighted ? "white" : "black"}>
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
        stroke={isHighlighted ? "orange" : "black"}
        strokeWidth="2"
      />
    );
  };
  
  export { TreeNode, Line };
  