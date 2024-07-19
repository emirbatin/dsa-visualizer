import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';
import { Button } from '@nextui-org/react';
import { PlusIcon } from "@heroicons/react/24/outline";
import { color } from 'framer-motion';

const DashboardPage = () => {
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

  const handleLearnClick = (id) => {
    navigate(`/admin/edit-algorithm/${id}`);
  };

  const cardData = algorithms.map((algorithm) => ({
    uuid: algorithm._id,
    cardTitle: algorithm.name,
    imagePath: algorithm.image,
    imageAlt: `${algorithm.name} Image`,
  }));

  return (
    <div className='flex flex-col p-6 w-screen h-screen'>
      <div className='flex flex-row justify-between'>
        <h1>Dashboard</h1>
        <Button isIconOnly onClick={() => navigate('/admin/add-algorithm')} style={{background: "var(--button-color)", color: "var(--background-color)"}}>
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>
  
      <div className='flex flex-row flex-wrap' style={{ gap: '16px', padding: 20 }}>
        {cardData.map((card) => (
          <Cards
            key={card.uuid}
            cardTitle={card.cardTitle}
            imagePath={card.imagePath}
            imageAlt={card.imageAlt}
            uuid={card.uuid}
            onLearnClick={handleLearnClick}
            buttonText="Edit"
            style={{ flex: '1 0 200px' }}
          />
        ))}
      </div>
    </div>
  );
  };
  
  export default DashboardPage;
  