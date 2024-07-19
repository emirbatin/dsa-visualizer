import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const Cards = ({ cardTitle, imagePath, imageAlt, uuid, onLearnClick, buttonText }) => {
  const handleLearnClick = () => {
    onLearnClick(uuid);
  };

  return (
    <div className="flex">
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={imageAlt || "Default Image Alt Text"}
          className="object-cover"
          height={200}
          src={imagePath || "https://res.cloudinary.com/dcy6ogtc1/image/upload/v1720702932/default_sspfru.png"}
          width={200}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{cardTitle}</p>
          <Button
            className="text-tiny text-white bg-black/40"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            onClick={handleLearnClick}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
