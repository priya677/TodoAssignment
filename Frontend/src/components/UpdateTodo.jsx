import React from "react";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";

function UpdateTodo() {
  const [todo, setTodo] = useState([]);
  const [isEdit, setisEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const getAllTodo = fetch("https://todo-assignment-server.vercel.app/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodo(data.data);
      });
  }, []);

  function handleClickUpdate() {
    console.log(isEdit);
    console.log(title);
    console.log(description);

    const url = `https://todo-assignment-server.vercel.app/edit-todo/${isEdit}`;

    const postData = {
      title: title,
      description: description,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("POST updated successful:", data);
        window.location.reload();

        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  }

  return (
    <div className="p-4  text-center ">
      <div className="font-bold">Update the todo which you want </div>

      {todo.length ? (
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
                    <button
                      onClick={() => {
                        setisEdit(data.id);
                        setTitle(data.title);
                        setdescription(data.description);
                      }}
                    >
                      <MdEdit size={24} />
                    </button>
                  </div>
                </div>

                <>
                  <div className=" flex  gap-x-4">
                    <div>Title:</div>
                    <div>{data.title}</div>
                  </div>
                  <div className=" flex  gap-x-4">
                    <div>Description:</div>
                    <div>{data.description}</div>
                  </div>
                </>

                {isEdit == data.id && (
                  <>
                    <div>
                      <div className=" flex  gap-x-4 m-4">
                        <div className="pt-1">Title:</div>
                        <div>
                          <input
                            value={title}
                            className="p-2 rounded-lg text-black"
                            onChange={(event) => {
                              setTitle(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flex  gap-x-4 m-4">
                        <div className="pt-1">Description:</div>
                        <div>
                          <input
                            value={description}
                            className="p-2 rounded-lg text-black"
                            onChange={(event) => {
                              setdescription(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className="  text-white bg-red-400 rounded-lg font-bold p-3"
                          onClick={handleClickUpdate}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </>
                )}
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

export default UpdateTodo;
