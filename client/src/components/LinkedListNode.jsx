import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Spacer } from "@nextui-org/react";

const LinkedListNode = ({ value, index, isLast, nodeColor, nextColor }) => {
  return (
    <div key={index} className="flex items-center unselectable">
      <div className="flex items-center shadow-lg rounded-lg">
        <div className="border-opacity-0 flex flex-col">
          <div
            className={`px-4 py-2 ${nodeColor} text-white rounded-tl-lg`}
            style={{ userSelect: "none" }}
          >
            data
          </div>
          <div className="px-4 py-2 bg-gray-100 text-black rounded-bl-lg">
            {value}
          </div>
        </div>
        <div className="flex flex-col ">
          <div
            className={`px-4 py-2 ${nextColor} text-white rounded-tr-lg`}
            style={{ userSelect: "none" }}
          >
            next
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-br-lg">
            {!isLast ? (
              <ArrowRightIcon className="h-6 w-6 text-black" />
            ) : (
              <p className="text-black">Null</p>
            )}
          </div>
        </div>
      </div>
      <Spacer x={4} />
      <div className="flex items-center">
        {!isLast ? <ArrowRightIcon className="h-6 w-6 text-var(--text-color)" /> : null}
      </div>
      <Spacer x={4} />
    </div>
  );
};

export default LinkedListNode;
