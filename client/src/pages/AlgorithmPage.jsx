import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import visualizers from "../components/Visualizer/Visualizers";
import { Spacer } from "@nextui-org/spacer";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/CodeBlock";

const components = {
  code: CodeBlock,
};

const AlgorithmPage = () => {
  const { algorithmId } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlgorithm = async () => {
      try {
        const response = await fetch(`/api/algorithms/${algorithmId}`);
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlgorithm();
  }, [algorithmId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!content) {
    return <p>No content found</p>;
  }

  const VisualizerComponent = visualizers[content.visualizer];

  if (!VisualizerComponent) {
    return <p>Visualizer not found</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/*Left - Visualizer */}
        <div style={{ flex: 2, padding: 0, overflowY: "auto" }}>
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
          <h1>{content.name}</h1>
          <Spacer y={4} />
          <ReactMarkdown components={components} className="markdown-content">
            {content.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};


export default AlgorithmPage;
