import React, { useState, useCallback, useMemo } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import AccordionComponent from "./Accordion";
import usePanZoom from "../hooks/usePanZoom";

const INITIAL_STATE = {
  linkedList: [],
  inputValue: "",
  currentSearchIndex: null,
  nextHighlightIndex: null,
  foundIndex: null,
  showPopup: false,
  popupMessage: "",
};

const COLORS = {
  default: "bg-purple-500",
  current: "bg-blue-500",
  found: "bg-green-500",
};

const LinkedListVisualizer = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const { containerRef, scale, position, dragging } = usePanZoom();

  const setInputValue = (value) => {
    setState((prev) => ({ ...prev, inputValue: value }));
  };

  const resetHighlights = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentSearchIndex: null,
      nextHighlightIndex: null,
      foundIndex: null,
    }));
  }, []);

  const handleCreate = useCallback(
    (count) => {
      if (count > 10) {
        setState((prev) => ({
          ...prev,
          showPopup: true,
          popupMessage: "En fazla 10 eleman oluşturabilirsiniz",
        }));
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            showPopup: false,
            popupMessage: "",
          }));
        }, 2000);
        return;
      }
      const newList = Array.from({ length: count }, () =>
        Math.floor(Math.random() * 100)
      );
      setState((prev) => ({ ...prev, linkedList: newList, inputValue: "" }));
      resetHighlights();
    },
    [resetHighlights]
  );

  const handleSearch = useCallback(
    (value) => {
      const intValue = parseInt(value, 10);
      let index = 0;

      setState((prev) => ({ ...prev, currentSearchIndex: 0 }));
      resetHighlights();

      const interval = setInterval(() => {
        if (index >= state.linkedList.length) {
          clearInterval(interval);
          setState((prev) => ({
            ...prev,
            showPopup: true,
            popupMessage: `${value} bulunamadı`,
          }));
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              showPopup: false,
              popupMessage: "",
            }));
          }, 2000); // 2 saniye sonra popup kaybolur
          resetHighlights();
          return;
        }

        setState((prev) => ({ ...prev, currentSearchIndex: index }));

        setTimeout(() => {
          setState((prev) => ({ ...prev, nextHighlightIndex: index }));

          setTimeout(() => {
            if (state.linkedList[index] === intValue) {
              clearInterval(interval);
              setState((prev) => ({ ...prev, foundIndex: index }));
              return;
            }
            index++;
            setState((prev) => ({
              ...prev,
              currentSearchIndex: index,
              nextHighlightIndex: null,
            }));
          }, 500);
        }, 500);
      }, 1500);
    },
    [state.linkedList, resetHighlights]
  );

  const handleInsert = useCallback(
    (value) => {
      if (state.linkedList.length >= 10) {
        setState((prev) => ({
          ...prev,
          showPopup: true,
          popupMessage: "Liste en fazla 10 eleman içerebilir",
        }));
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            showPopup: false,
            popupMessage: "",
          }));
        }, 2000);
        return;
      }

      const intValue = parseInt(value, 10);
      let index = 0;

      setState((prev) => ({ ...prev, currentSearchIndex: 0 }));
      resetHighlights();

      const interval = setInterval(() => {
        if (index >= state.linkedList.length) {
          clearInterval(interval);
          setState((prev) => ({
            ...prev,
            linkedList: [...prev.linkedList, intValue],
            inputValue: "",
          }));
          resetHighlights();
          return;
        }

        setState((prev) => ({ ...prev, currentSearchIndex: index }));

        setTimeout(() => {
          setState((prev) => ({ ...prev, nextHighlightIndex: index }));

          setTimeout(() => {
            index++;
            setState((prev) => ({
              ...prev,
              currentSearchIndex: index,
              nextHighlightIndex: null,
            }));
          }, 500);
        }, 500);
      }, 1000);
    },
    [state.linkedList, resetHighlights]
  );

  const handleRemove = useCallback(
    (value) => {
      const intValue = parseInt(value, 10);
      let index = 0;

      setState((prev) => ({ ...prev, currentSearchIndex: 0 }));
      resetHighlights();

      const interval = setInterval(() => {
        if (index >= state.linkedList.length) {
          clearInterval(interval);
          setState((prev) => ({
            ...prev,
            showPopup: true,
            popupMessage: `${value} bulunamadı`,
          }));
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              showPopup: false,
              popupMessage: "",
            }));
          }, 2000); // 2 saniye sonra popup kaybolur
          resetHighlights();
          return;
        }

        setState((prev) => ({ ...prev, currentSearchIndex: index }));

        setTimeout(() => {
          setState((prev) => ({ ...prev, nextHighlightIndex: index }));

          setTimeout(() => {
            if (state.linkedList[index] === intValue) {
              clearInterval(interval);
              const newList = [...state.linkedList];
              newList.splice(index, 1);
              setState((prev) => ({
                ...prev,
                linkedList: newList,
                inputValue: "",
              }));
              resetHighlights();
              return;
            }
            index++;
            setState((prev) => ({
              ...prev,
              currentSearchIndex: index,
              nextHighlightIndex: null,
            }));
          }, 500);
        }, 500);
      }, 1500);
    },
    [state.linkedList, resetHighlights]
  );

  const accordionItems = useMemo(
    () => [
      {
        key: "create",
        ariaLabel: "Create",
        icon: "plus",
        title: "Create LinkedList (N)",
        inputs: [
          {
            type: "number",
            placeholder: "Max Size (N)",
            value: state.inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "blue",
        buttonText: "Create",
        onClick: () => handleCreate(parseInt(state.inputValue, 10)),
      },
      {
        key: "search",
        ariaLabel: "Search",
        icon: "check",
        title: "Search (V)",
        inputs: [
          {
            type: "text",
            placeholder: "Value (V)",
            value: state.inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "purple",
        buttonText: "Search",
        onClick: () => handleSearch(state.inputValue),
      },
      {
        key: "insert",
        ariaLabel: "Insert",
        icon: "arrowUp",
        title: "Insert (V)",
        inputs: [
          {
            type: "text",
            placeholder: "Value (V)",
            value: state.inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "green",
        buttonText: "Insert",
        onClick: () => handleInsert(state.inputValue),
      },
      {
        key: "remove",
        ariaLabel: "Remove",
        icon: "trash",
        title: "Remove (V)",
        inputs: [
          {
            type: "text",
            placeholder: "Value (V)",
            value: state.inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "red",
        buttonText: "Remove",
        onClick: () => handleRemove(state.inputValue),
      },
    ],
    [state.inputValue, handleCreate, handleSearch, handleInsert, handleRemove]
  );

  const renderNode = useCallback(
    (value, index) => {
      const isLast = index === state.linkedList.length - 1;
      const nodeColor =
        state.foundIndex === index || state.currentSearchIndex === index
          ? COLORS.found
          : COLORS.default;
      const nextColor =
        state.nextHighlightIndex === index && state.foundIndex === null
          ? COLORS.current
          : COLORS.default;

      return (
        <div key={index} className="flex items-center">
          <div className="border-2 border-black border-opacity-0 flex flex-col">
            <div className={`px-4 py-2 ${nodeColor} text-white`}>data</div>
            <div className="px-4 py-2 bg-white text-black">{value}</div>
          </div>
          <div className="border-2 border-black border-opacity-0 flex flex-col">
            <div className={`px-4 py-2 ${nextColor} text-white`}>next</div>
            <div className="px-4 py-2 bg-white">
              {!isLast ? (
                <ArrowRightIcon className="h-6 w-6 text-black" />
              ) : (
                <p className="text-black">Null</p>
              )}
            </div>
          </div>
        </div>
      );
    },
    [
      state.linkedList,
      state.foundIndex,
      state.currentSearchIndex,
      state.nextHighlightIndex,
    ]
  );

  return (
    <div className="p-4">
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "0 0",
          cursor: dragging ? "grabbing" : "grab",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="flex items-center mt-4">
          {state.linkedList.length > 0 ? state.linkedList.map(renderNode) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 p-4">
        <AccordionComponent items={accordionItems} />
      </div>
      {state.showPopup && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white p-4 rounded">
          {state.popupMessage}
        </div>
      )}
    </div>
  );
};

export default LinkedListVisualizer;
