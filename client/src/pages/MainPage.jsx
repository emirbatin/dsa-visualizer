import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";

const MainPage = () => {
  const [algorithms, setAlgorithms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlgorithms = async () => {
      const response = await fetch('/api/algorithms');
      const data = await response.json();
      setAlgorithms(data);
    };
    fetchAlgorithms();
  }, []);

  const handleLearnClick = (uuid) => {
    navigate(`/algorithm/${uuid}`);
  };

  const cardData = algorithms.map((algorithm) => ({
    uuid: algorithm._id,
    cardTitle: algorithm.name,
    imagePath: algorithm.image,
    imageAlt: `${algorithm.name} Image`,
  }));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        padding: 20,
        paddingRight: 50,
        paddingLeft: 50
      }}
    >
      {cardData.map((card) => (
        <Cards
          key={card.uuid}
          cardTitle={card.cardTitle}
          imagePath={card.imagePath}
          imageAlt={card.imageAlt}
          uuid={card.uuid}
          onLearnClick={handleLearnClick}
          buttonText="Learn"
        />
      ))}
    </div>
  );
};

export default MainPage;
