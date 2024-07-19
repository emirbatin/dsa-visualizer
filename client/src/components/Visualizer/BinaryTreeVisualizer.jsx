import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TreeNode, Line } from "../TreeNode";
import AccordionComponent from "../Accordion";
import usePanZoom from "../../hooks/usePanZoom";
import AlertPopup from "../AlertPopup";
import { BinarySearchTree } from "../../utils/binarySearchTree";
import calculateNodePositions from "../../utils/calculateNodePositions";
import { Slider } from "@nextui-org/react";

const INITIAL_STATE = {
  inputValue: "",
  showPopup: false,
  popupMessage: "",
  animationSpeed: 500,
  dragging: false,
};

const MAX_NODES = 15;

const BinaryTreeVisualizer = () => {
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [highlightedLink, setHighlightedLink] = useState(null);
  const [foundNode, setFoundNode] = useState(null);
  const [coords, setCoords] = useState([]);
  const [links, setLinks] = useState([]);
  const [inputValue, setInputValue] = useState(INITIAL_STATE.inputValue);
  const [{ showPopup, popupMessage, animationSpeed }, setState] =
    useState(INITIAL_STATE);
  const { containerRef, scale, position, dragging } = usePanZoom();
  const [bst] = useState(() => {
    const tree = new BinarySearchTree();
    [29, 19, 48].forEach((value) => tree.insert(value));
    return tree;
  });

  const updateTree = useCallback(() => {
    const coordinates = calculateNodePositions(bst.root);
    coordinates.forEach(({ x, y, value }) => {
      let node = bst.root;
      while (node) {
        if (node.value === value) {
          node.x = x;
          node.y = y;
          break;
        }
        node = value < node.value ? node.left : node.right;
      }
    });
    setCoords(coordinates);
    setLinks(bst.getLinks(bst.root));
  }, [bst]);

  useEffect(() => {
    updateTree();
  }, [updateTree]);

  useEffect(() => {
    if (highlightedNode === null && highlightedLink === null) {
      updateTree();
    }
  }, [highlightedNode, highlightedLink, updateTree]);

  const showError = useCallback((message) => {
    setState((prev) => ({ ...prev, showPopup: true, popupMessage: message }));
    setTimeout(
      () =>
        setState((prev) => ({ ...prev, showPopup: false, popupMessage: "" })),
      3000
    );
  }, []);

  const handleCreate = useCallback(
    (n) => {
      if (isNaN(n) || n <= 0 || n > MAX_NODES) {
        showError(`Please enter a valid number between 1 and ${MAX_NODES}.`);
        return;
      }
      bst.root = null;
      Array.from({ length: n }, () => Math.floor(Math.random() * 100)).forEach(
        (value) => bst.insert(value)
      );
      updateTree();
    },
    [bst, showError, updateTree]
  );

  const handleInsert = useCallback(
    async (value) => {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        showError("Please enter a valid number.");
        return;
      }
      if (bst.countNodes() >= MAX_NODES) {
        showError(`Cannot insert more than ${MAX_NODES} nodes.`);
        return;
      }
      await bst.insertWithAnimation(
        intValue,
        async (node, link) => {
          if (node) setHighlightedNode(node);
          if (link) setHighlightedLink(link);
          updateTree();
          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        },
        animationSpeed
      );
      setHighlightedNode(null);
      setHighlightedLink(null);
    },
    [bst, showError, updateTree, animationSpeed]
  );

  const handleRemove = useCallback(
    async (value) => {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        showError("Please enter a valid number.");
        return;
      }
      await bst.removeWithAnimation(
        intValue,
        async (node, link) => {
          if (node) setHighlightedNode(node);
          if (link) setHighlightedLink(link);
          updateTree();
          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        },
        animationSpeed
      );
      setHighlightedNode(null);
      setHighlightedLink(null);
    },
    [bst, showError, updateTree, animationSpeed]
  );

  const handleSearch = useCallback(
    async (value) => {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        showError("Please enter a valid number.");
        return;
      }

      setFoundNode(null);

      const foundNode = await bst.searchWithAnimation(
        intValue,
        async (node, link) => {
          if (node) setHighlightedNode(node);
          if (link) setHighlightedLink(link);
          updateTree();
          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        },
        animationSpeed
      );
      setHighlightedNode(null);
      setHighlightedLink(null);
      setFoundNode(foundNode);
      if (foundNode) {
        showError(`Value ${intValue} found in the tree!`);
        setTimeout(() => {
          setFoundNode(null);
          updateTree();
        }, 1000);
      } else {
        showError(`Value ${intValue} not found in the tree.`);
      }
    },
    [bst, showError, updateTree, animationSpeed]
  );

  const handleTraversal = useCallback(
    async (type) => {
      const visitCallback = async (node) => {
        setHighlightedNode(node);
        updateTree();
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      };
      if (type === "inorder") {
        await bst.inorderTraversalWithAnimation(
          bst.root,
          visitCallback,
          animationSpeed
        );
      } else if (type === "preorder") {
        await bst.preorderTraversalWithAnimation(
          bst.root,
          visitCallback,
          animationSpeed
        );
      } else if (type === "postorder") {
        await bst.postorderTraversalWithAnimation(
          bst.root,
          visitCallback,
          animationSpeed
        );
      }
      setHighlightedNode(null);
    },
    [bst, updateTree, animationSpeed]
  );

  const accordionItems = useMemo(
    () => [
      {
        key: "create",
        ariaLabel: "Create",
        icon: "plus",
        title: "Create BST (N)",
        inputs: [
          {
            type: "number",
            placeholder: `Max Size (N) (max: ${MAX_NODES})`,
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            max: MAX_NODES,
          },
        ],
        buttonColor: "blue",
        buttonText: "Create",
        onClick: () => handleCreate(parseInt(inputValue, 10)),
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
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "green",
        buttonText: "Insert",
        onClick: () => handleInsert(inputValue),
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
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "red",
        buttonText: "Remove",
        onClick: () => handleRemove(inputValue),
      },
      {
        key: "search",
        ariaLabel: "Search",
        icon: "search",
        title: "Search (V)",
        inputs: [
          {
            type: "text",
            placeholder: "Value (V)",
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
          },
        ],
        buttonColor: "yellow",
        buttonText: "Search",
        onClick: () => handleSearch(inputValue),
      },
      {
        key: "inorder",
        ariaLabel: "Inorder Traversal",
        icon: "sort",
        title: "Inorder Traversal",
        buttonColor: "purple",
        buttonText: "Inorder",
        onClick: () => handleTraversal("inorder"),
      },
      {
        key: "preorder",
        ariaLabel: "Preorder Traversal",
        icon: "sort",
        title: "Preorder Traversal",
        buttonColor: "orange",
        buttonText: "Preorder",
        onClick: () => handleTraversal("preorder"),
      },
      {
        key: "postorder",
        ariaLabel: "Postorder Traversal",
        icon: "sort",
        title: "Postorder Traversal",
        buttonColor: "pink",
        buttonText: "Postorder",
        onClick: () => handleTraversal("postorder"),
      },
    ],
    [
      inputValue,
      handleCreate,
      handleInsert,
      handleRemove,
      handleSearch,
      handleTraversal,
    ]
  );

  return (
    <div className="unselectable">
      <div
        ref={containerRef}
        style={{
          overflow: "hidden",
          position: "relative",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <svg
          width="100vw"
          height="100vh"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "0 0",
          }}
        >
          {links.map((link, index) => (
            <Line
              key={index}
              {...link}
              isHighlighted={
                highlightedLink &&
                highlightedLink.from.value === link.x1 &&
                highlightedLink.to.value === link.x2
              }
            />
          ))}
          {coords.map((coord, index) => (
            <TreeNode
              key={index}
              cx={coord.x}
              cy={coord.y}
              value={`${coord.value} - ${coord.count}`}
              isHighlighted={
                (highlightedNode && highlightedNode.value === coord.value) ||
                (foundNode && foundNode.value === coord.value) // Bulunan düğüm vurgulandı
              }
              highlightColor={
                foundNode && foundNode.value === coord.value ? "orange" : null // Bulunan düğüm turuncu renkte olacak
              }
            />
          ))}
        </svg>
      </div>
      <div className="fixed bottom-0 left-0 p-4">
        <AccordionComponent items={accordionItems} />
        <Slider
          label="Animation Speed"
          step={100}
          maxValue={2000}
          minValue={100}
          defaultValue={500}
          onChange={(value) =>
            setState((prev) => ({ ...prev, animationSpeed: value }))
          }
        />
      </div>
      <AlertPopup
        show={showPopup}
        message={popupMessage}
        onClose={() =>
          setState((prevState) => ({ ...prevState, showPopup: false }))
        }
      />
    </div>
  );
};

export default BinaryTreeVisualizer;
