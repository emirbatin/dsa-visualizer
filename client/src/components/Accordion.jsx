import React from "react";
import { Accordion, AccordionItem, Input, Button } from "@nextui-org/react";
import {
  PlusCircleIcon,
  ArrowUpIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  plus: <PlusCircleIcon className="text-primary h-6 w-6" />,
  arrowUp: <ArrowUpIcon className="text-green-500 h-6 w-6" />,
  trash: <TrashIcon className="text-red-500 h-6 w-6" />,
  pencil: <PencilSquareIcon className="text-yellow-500 h-6 w-6" />,
  check: <CheckCircleIcon className="text-purple-500 h-6 w-6" />,
};

const AccordionComponent = ({ items }) => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <Accordion
      showDivider={false}
      className="p-2 flex flex-col gap-1 bg-var(--background-color) w-[250px]" 
      variant="shadow"
      itemClasses={itemClasses}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.key}
          aria-label={item.ariaLabel}
          startContent={iconMap[item.icon]}
          title={<p>{item.title}</p>}
        >
          <div className="flex flex-col items-center">
            {item.inputs &&
              item.inputs.map((input) => (
                <Input
                  key={input.placeholder}
                  type={input.type}
                  className="p-2 rounded w-full" 
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={input.onChange}
                />
              ))}
            <Button
              className={`bg-${item.buttonColor}-500 text-white p-2 rounded mt-2 w-full`} 
              onClick={item.onClick}
            >
              {item.buttonText}
            </Button>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
