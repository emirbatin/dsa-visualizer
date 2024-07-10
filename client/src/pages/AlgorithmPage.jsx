import React from "react";
import { useParams } from "react-router-dom";
import { algorithmContent } from "../data/algorithmContent";
import visualizers from "../components/Visualizers";
import { Spacer } from "@nextui-org/spacer";

const AlgorithmPage = () => {
  const { algorithmId } = useParams();
  const content = algorithmContent[algorithmId];

  if (!content) {
    return <p>Content not found</p>;
  }

  const VisualizerComponent = visualizers[content.visualizer];

  if (!VisualizerComponent) {
    return <p>Visualizer not found</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/*Left - Visualizer */}
        <div style={{ flex: 2, padding: 20, overflowY: "auto" }}>
          <VisualizerComponent />
        </div>
        {/*Right - Details */}
        <div
          style={{
            flex: 1,
            padding: 20,
            overflowY: "auto",
            borderLeft: "1px solid #ccc",
            height: "100vh",
          }}
        >
          <h1>{content.title}</h1>
          <Spacer y={4} />
          <p>{content.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
