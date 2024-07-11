import React, { useState, useCallback, useMemo } from "react";
import AccordionComponent from "../Accordion";
import AlertPopup from "../AlertPopup";

const INITIAL_STATE = {
  array: [],
  size: "",
  value: "",
  index: "",
  selectedIndex: null,
  showPopup: false,
  popupMessage: "",
};

const MAX_SIZE = 10;

const ArrayVisualizer = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const setSize = (value) => {
    setState((prev) => ({ ...prev, size: value }));
  };

  const setValue = (value) => {
    setState((prev) => ({ ...prev, value }));
  };

  const setIndex = (value) => {
    setState((prev) => ({ ...prev, index: value }));
  };

  const resetHighlights = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedIndex: null,
    }));
  }, []);

  const handleCreate = useCallback(
    (size) => {
      if (size > MAX_SIZE) {
        setState((prev) => ({
          ...prev,
          showPopup: true,
          popupMessage: "15'ten büyük bir değer girilemez.",
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
      const newArray = Array.from({ length: Math.min(size, 15) }, () =>
        Math.floor(Math.random() * 100)
      );
      setState((prev) => ({
        ...prev,
        array: newArray.slice(0, 15),
        size: "",
      }));
      resetHighlights();
    },
    [resetHighlights]
  );

  const handleInsert = useCallback(
    (value) => {
      if (state.array.length >= MAX_SIZE) {
        setState((prev) => ({
          ...prev,
          showPopup: true,
          popupMessage: "Maksimum 10 eleman ekleyebilirsiniz.",
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
      if (Number(value) > 15) {
        setState((prev) => ({
          ...prev,
          showPopup: true,
          popupMessage: "10'ten büyük bir değer girilemez.",
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
      const newArray = [...state.array, Number(value)].slice(0, 15);
      setState((prev) => ({
        ...prev,
        array: newArray,
        value: "",
      }));
      resetHighlights();
    },
    [state.array, resetHighlights]
  );

  const handleRemove = useCallback(
    (index) => {
      const newArray = state.array.filter((_, i) => i !== Number(index));
      setState((prev) => ({
        ...prev,
        array: newArray,
        index: "",
      }));
      resetHighlights();
    },
    [state.array, resetHighlights]
  );

  const handleUpdate = useCallback(
    (index, value) => {
      const newArray = [...state.array];
      newArray[Number(index)] = Number(value);
      setState((prev) => ({
        ...prev,
        array: newArray,
        index: "",
        value: "",
      }));
      resetHighlights();
    },
    [state.array, resetHighlights]
  );

  const handleSelect = useCallback((index) => {
    setState((prev) => ({
      ...prev,
      selectedIndex: Number(index),
      index: "",
    }));
  }, []);

  const accordionItems = useMemo(
    () => [
      {
        key: "create",
        ariaLabel: "Create",
        icon: "plus",
        title: "Create Array (N)",
        inputs: [
          {
            type: "number",
            placeholder: "Size (N)",
            value: state.size,
            onChange: (e) => setSize(e.target.value),
          },
        ],
        buttonColor: "blue",
        buttonText: "Create",
        onClick: () => handleCreate(parseInt(state.size, 10)),
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
            value: state.value,
            onChange: (e) => setValue(e.target.value),
          },
        ],
        buttonColor: "green",
        buttonText: "Insert",
        onClick: () => handleInsert(state.value),
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
            value: state.index,
            onChange: (e) => setIndex(e.target.value),
          },
        ],
        buttonColor: "red",
        buttonText: "Remove",
        onClick: () => handleRemove(state.index),
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
            value: state.index,
            onChange: (e) => setIndex(e.target.value),
          },
          {
            type: "text",
            placeholder: "Value (V)",
            value: state.value,
            onChange: (e) => setValue(e.target.value),
          },
        ],
        buttonColor: "yellow",
        buttonText: "Update",
        onClick: () => handleUpdate(state.index, state.value),
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
            value: state.index,
            onChange: (e) => setIndex(e.target.value),
          },
        ],
        buttonColor: "purple",
        buttonText: "Select",
        onClick: () => handleSelect(state.index),
      },
    ],
    [
      state.size,
      state.value,
      state.index,
      handleCreate,
      handleInsert,
      handleRemove,
      handleUpdate,
      handleSelect,
    ]
  );

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center">
        {state.array.map((value, i) => (
          <div
            key={i}
            className={`flex flex-col bg-gray-200 m-2 rounded text-center w-16 h-32 ${
              i === state.selectedIndex ? "bg-blue-500" : ""
            }`}
          >
            {/* İndex */}
            <div
              className={`flex-1 flex rounded-t justify-center items-center border-solid border-1 border-transparent text-white ${
                i === state.selectedIndex ? "bg-red-500" : "bg-purple-500"
              }`}
            >
              <h2>{i}</h2>
            </div>

            {/* İndex Değeri*/}
            <div
              className={`flex-1 flex rounded-b justify-center items-center border-solid border-1 border-transparent shadow-lg ${
                i === state.selectedIndex ? "bg-orange-500" : "bg-gray-100"
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
      {state.showPopup && (
        <AlertPopup
          show={state.showPopup}
          message={state.popupMessage}
          onClose={() => setState((prev) => ({ ...prev, showPopup: false }))}
        />
      )}
    </div>
  );
};

export default ArrayVisualizer;
