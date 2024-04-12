import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FrontPart from "./components/FrontPart";
import AllTodo from "./components/AllTodo";
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import DeleteTodo from "./components/DeleteTodo";

function App() {
  const valid = true;
  const [data, setdata] = useState(0);

  return (
    <>
      <div>
        <div className=" text-2xl  text-center  flex justify-center font-bold text-blue-600 p-4 underline  ">
          <h1>WELCOME TO TODO BAR </h1>
        </div>
        <div>
          <FrontPart setdata={setdata} />
        </div>
        {data == 0 && <AllTodo />}
        {data == 1 && <CreateTodo />}
        {data == 2 && <UpdateTodo />}
        {data == 3 && <DeleteTodo />}
      </div>
    </>
  );
}

export default App;
