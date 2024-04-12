import React from "react";
import { useEffect, useState } from "react";

function AllTodo() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getAllTodo = fetch("http://localhost:5000/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodo(data.data);
      });
  }, []);

  return (
    <div className="p-4  text-center ">
      {todo.length > 0 && <div className="font-bold">All todo list</div>}

      {todo.length > 0 ? (
        <>
          {todo.map((data) => {
            return (
              <div
                className="border border-yellow-600 rounded-lg p-2 bg-yellow-100 text-gray-400 shadow-xl font-bold m-4"
                key={data.id}
              >
                <div className=" flex  gap-x-4">
                  <div>Sno:</div>
                  <div>{data.id}</div>
                </div>
                <div className=" flex  gap-x-4">
                  <div>Title:</div>
                  <div>{data.title}</div>
                </div>
                <div className=" flex  gap-x-4">
                  <div>Description:</div>
                  <div>{data.description}</div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div>
            <h1 className=" font-bold text-gray-400 text-center">
              No any Todo Added , Please Add todo Using Create Todo button
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export default AllTodo;
