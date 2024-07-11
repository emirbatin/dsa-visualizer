import React, { useState, useCallback, useMemo } from "react";
import AccordionComponent from "../Accordion";
import AlertPopup from "../AlertPopup";
import LinkedListNode from "../LinkedListNode";
import usePanZoom from "../../hooks/usePanZoom";

const INITIAL_STATE = {
  linkedList: [],
  inputValue: "",
  currentSearchIndex: null,
  nextHighlightIndex: null,
  foundIndex: null,
  showPopup: false,
  popupMessage: "",
  dragging: false,
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

  return (
    <div className="p-4">
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "0 0",
          cursor: dragging ? "grabbing" : "grab",
          width: "200vw",
          height: "200vh",
          overflow: "hidden",
        }}
      >
        <div className="flex items-center mt-4">
          {state.linkedList.length > 0
            ? state.linkedList.map((value, index) => (
                <LinkedListNode
                  key={index}
                  value={value}
                  index={index}
                  isLast={index === state.linkedList.length - 1}
                  nodeColor={
                    state.foundIndex === index
                      ? "linked-list-node found"
                      : state.currentSearchIndex === index
                      ? "linked-list-node current"
                      : "linked-list-node bg-purple-500"
                  }
                  nextColor={
                    state.nextHighlightIndex === index &&
                    state.foundIndex === null
                      ? "linked-list-node current"
                      : "linked-list-node bg-purple-500"
                  }
                />
              ))
            : null}
        </div>
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

export default LinkedListVisualizer;
