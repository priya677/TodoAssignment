import React from "react";

function FrontPart(props) {
  return (
    <div className=" flex justify-center gap-x-4 text-sm">
      <div>
        <button
          className="p-1 bg-red-300 rounded-md text-white font-bold"
          onClick={() => {
            props.setdata(0);
          }}
        >
          View Todo
        </button>
      </div>
      <div>
        <button
          className="p-1 bg-red-300 rounded-md text-white font-bold"
          onClick={() => {
            props.setdata(1);
          }}
        >
          Create Todo
        </button>
      </div>
      <div>
        <button
          className="p-1 bg-red-300 rounded-md text-white font-bold"
          onClick={() => {
            props.setdata(2);
          }}
        >
          Update Todo
        </button>
      </div>
      <div>
        <button
          className="p-1 bg-red-300 rounded-md text-white font-bold"
          onClick={() => {
            props.setdata(3);
          }}
        >
          Delete Todo
        </button>
      </div>
    </div>
  );
}

export default FrontPart;
