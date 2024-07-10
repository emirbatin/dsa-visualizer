// pages/MainPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import { algorithmContent } from "../data/algorithmContent";

const MainPage = () => {
  const navigate = useNavigate();

  const cardData = Object.keys(algorithmContent).map((key) => ({
    uuid: key,
    cardTitle: algorithmContent[key].title,
    imagePath: algorithmContent[key].image,
    imageAlt: `${algorithmContent[key].title} Image`,
  }));

  const handleLearnClick = (uuid) => {
    navigate(`/algorithm/${uuid}`);
  };

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
        />
      ))}
    </div>
  );
};

export default MainPage;
