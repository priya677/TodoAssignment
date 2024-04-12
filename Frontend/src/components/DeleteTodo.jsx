import React from "react";
import { useState, useEffect } from "react";
function DeleteTodo() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getAllTodo = fetch("https://todo-assignment-server.vercel.app/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodo(data.data);
      });
  }, []);

  function handleDeleteChange(event) {
    console.log(event.target.value);
    const id = event.target.value;
    const url = `http://localhost:5000/delete-todo/${id}`;
    const getxyz = fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.sucess) {
          alert("Your Todo Deleted Sucessfully");
          window.location.reload();
        }
      });
  }

  return (
    <div className="p-4  text-center ">
      <div className="font-bold">Click on CheckBox to delete Specific todo</div>

      {todo.length > 0 ? (
        <>
          {todo.map((data) => {
            return (
              <div
                className="border border-yellow-600 rounded-lg p-2 bg-yellow-100 text-gray-400 shadow-xl font-bold m-4"
                key={data.id}
              >
                <div className=" flex justify-between">
                  <div className=" flex  gap-x-4">
                    <div>Sno:</div>
                    <div>{data.id}</div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value={data.id}
                      onChange={(event) => {
                        handleDeleteChange(event);
                      }}
                    />
                  </div>
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

export default DeleteTodo;
