import React, { useState } from "react";
import AccordionComponent from "../Accordion";

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCreate = () => {
    const filledArray = Array.from({ length: Math.min(size, maxValue) }, () =>
      Math.floor(Math.random() * (Number(maxValue) + 1))
    );
    const nullArray = Array.from({ length: size - filledArray.length }).fill(
      null
    );
    setArray([...filledArray, ...nullArray]);
  };

  const handleInsert = () => {
    const firstNullIndex = array.indexOf(null);
    if (firstNullIndex !== -1) {
      const newArray = [...array];
      newArray[firstNullIndex] = value;
      setArray(newArray);
    } else {
      setArray([...array, value]);
    }
  };

  const handleRemove = () => {
    const newArray = array.filter((_, i) => i !== Number(index));
    setArray(newArray);
  };

  const handleUpdate = () => {
    const newArray = [...array];
    newArray[Number(index)] = value;
    setArray(newArray);
  };

  const handleSelect = () => {
    setSelectedIndex(Number(index));
  };

  const accordionItems = [
    {
      key: "create",
      ariaLabel: "Create",
      icon: "plus",
      title: "Create Array (M, N)",
      inputs: [
        {
          type: "number",
          placeholder: "Size (M)",
          value: size,
          onChange: (e) => setSize(e.target.value),
        },
        {
          type: "number",
          placeholder: "Max Value (N)",
          value: maxValue,
          onChange: (e) => setMaxValue(e.target.value),
        },
      ],
      buttonColor: "blue",
      buttonText: "Create",
      onClick: handleCreate,
    },
    {
      key: "insert",
      ariaLabel: "Insert",
      icon: "arrowUp",
      title: "Insert Value (V)",
      inputs: [
        {
          type: "text",
          placeholder: "Value (V)",
          value: value,
          onChange: (e) => setValue(e.target.value),
        },
      ],
      buttonColor: "green",
      buttonText: "Insert",
      onClick: handleInsert,
    },
    {
      key: "remove",
      ariaLabel: "Remove",
      icon: "trash",
      title: "Remove Value (i)",
      inputs: [
        {
          type: "number",
          placeholder: "Index (i)",
          value: index,
          onChange: (e) => setIndex(e.target.value),
        },
      ],
      buttonColor: "red",
      buttonText: "Remove",
      onClick: handleRemove,
    },
    {
      key: "update",
      ariaLabel: "Update",
      icon: "pencil",
      title: "Update Value (i, V)",
      inputs: [
        {
          type: "number",
          placeholder: "Index (i)",
          value: index,
          onChange: (e) => setIndex(e.target.value),
        },
        {
          type: "text",
          placeholder: "Value (V)",
          value: value,
          onChange: (e) => setValue(e.target.value),
        },
      ],
      buttonColor: "yellow",
      buttonText: "Update",
      onClick: handleUpdate,
    },
    {
      key: "select",
      ariaLabel: "Select",
      icon: "check",
      title: "Select Index (i)",
      inputs: [
        {
          type: "number",
          placeholder: "Index (i)",
          value: index,
          onChange: (e) => setIndex(e.target.value),
        },
      ],
      buttonColor: "purple",
      buttonText: "Select",
      onClick: handleSelect,
    },
  ];

  return (
    <div className="p-0">
      <div className="flex flex-wrap justify-center">
        {array.map((value, i) => (
          <div
            key={i}
            className={`flex flex-col bg-gray-200 m-2 rounded text-center w-16 h-32 ${
              i === selectedIndex ? "bg-blue-500" : ""
            }`}
          >
            {/* İndex */}
            <div
              className={`flex-1 flex rounded-t justify-center items-center ${
                i === selectedIndex ? "bg-red-500" : "bg-blue-300"
              }`}
            >
              <h2>{i}</h2>
            </div>

            {/* İndex Değeri*/}
            <div
              className={`flex-1 flex rounded-b justify-center items-center ${
                i === selectedIndex ? "bg-green-500" : "bg-red-200"
              }`}
            >
              <h2>{value !== null ? value : ""}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 p-4">
        <AccordionComponent items={accordionItems} />
      </div>
    </div>
  );
};

export default ArrayVisualizer;
