import React from "react";
import { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  function handleClick() {
    const url = "https://todo-assignment-server.vercel.app/create-todo";

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
        console.log("POST request successful:", data);
        window.location.reload();

        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  }

  return (
    <div className="">
      <div className=" text-center p-4 font-semibold text-lg ">
        Enter Todo detail to add new Task:
      </div>
      <div className="">
        <div>
          <div className="text-center p-1">Enter Title :</div>
          <div className=" text-center">
            <input
              placeholder=" enter detail"
              className=" border border-black rounded-lg p-1"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div className="text-center p-1">Enter Description :</div>
          <div className=" text-center">
            <input
              placeholder=" enter description"
              className=" border border-black rounded-lg p-1"
              onChange={(event) => {
                setdescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className=" flex justify-center p-4">
          <button
            className=" bg-red-400 rounded-lg p-3  text-white font-bold"
            onClick={handleClick}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
