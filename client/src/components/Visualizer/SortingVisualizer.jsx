import React, { useState, useCallback, useMemo } from "react";
import AccordionComponent from "../Accordion";
import { Slider } from "@nextui-org/react";

const INITIAL_STATE = {
  array: [],
  size: "",
  maxValue: "",
  animationSpeed: 500,
};

const SortingVisualizer = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const updateState = useCallback((key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const handleCreate = useCallback(() => {
    const newArray = Array.from(
      { length: Number(state.size) },
      () => Math.floor(Math.random() * (Number(state.maxValue) + 1))
    );
    updateState("array", newArray);
  }, [state.size, state.maxValue, updateState]);

  const bubbleSort = useCallback((arr, animations) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const isFinal = j === n - i - 2;
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j + 1, true, isFinal]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        } else {
          animations.push([j, j + 1, false, isFinal]);
        }
      }
    }
  }, []);

  const animateSort = useCallback((animations) => {
    animations.forEach(([barOneIdx, barTwoIdx, isSwap, isFinal], i) => {
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        barOneStyle.backgroundColor = barTwoStyle.backgroundColor = "green";

        setTimeout(() => {
          if (isSwap) {
            const tempHeight = barOneStyle.height;
            const tempValue = arrayBars[barOneIdx].textContent;
            barOneStyle.height = barTwoStyle.height;
            arrayBars[barOneIdx].textContent = arrayBars[barTwoIdx].textContent;
            barTwoStyle.height = tempHeight;
            arrayBars[barTwoIdx].textContent = tempValue;
          }
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = isFinal ? "orange" : "purple";
        }, state.animationSpeed / 2);
      }, i * state.animationSpeed);
    });

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      Array.from(arrayBars).forEach(bar => bar.style.backgroundColor = "purple");
    }, animations.length * state.animationSpeed + state.animationSpeed);
  }, [state.animationSpeed]);

  const handleSort = useCallback(() => {
    const animations = [];
    const arr = [...state.array];
    bubbleSort(arr, animations);
    animateSort(animations);
  }, [state.array, bubbleSort, animateSort]);

  const accordionItems = useMemo(() => [
    {
      key: "create",
      ariaLabel: "Create",
      icon: "plus",
      title: "Create Array (Size, Max Value)",
      inputs: [
        {
          type: "number",
          placeholder: "Size",
          value: state.size,
          onChange: (e) => updateState("size", e.target.value),
        },
        {
          type: "number",
          placeholder: "Max Value",
          value: state.maxValue,
          onChange: (e) => updateState("maxValue", e.target.value),
        },
      ],
      buttonColor: "blue",
      buttonText: "Create",
      onClick: handleCreate,
    },
    {
      key: "sort",
      ariaLabel: "Sort",
      icon: "check",
      title: "Sort Array",
      inputs: [],
      buttonColor: "green",
      buttonText: "Sort",
      onClick: handleSort,
    },
  ], [state.size, state.maxValue, handleCreate, handleSort, updateState]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-end mt-4 h-64">
        {state.array.map((value, idx) => (
          <div
            className="array-bar bg-purple-500 mx-3 text-center flex flex-col justify-end rounded-t"
            key={idx}
            style={{
              height: `${(value / state.maxValue) * 100}%`,
              width: "40px",
            }}
          >
            <div className="text-white">
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 p-4 flex flex-col items-center">
        <AccordionComponent items={accordionItems} />
        <div className="mt-4 w-full max-w-md">
          <Slider
            label="Animation Speed"
            step={100}
            maxValue={2000}
            minValue={100}
            defaultValue={500}
            onChange={(value) => updateState("animationSpeed", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;