const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const TodoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
});
const TodoModal = mongoose.model("Todo", TodoSchema);

app.use(express.json());

const uri =
"mongodb+srv://priyados708:hWj2rWvn6cjoChjC@cluster0.nmtmzuz.mongodb.net/Todo_data?retryWrites=true&w=majority&appName=Cluster0"
const dbConnection = mongoose
  .connect(uri)
  .then((ressponse) => {
    console.log("Connection Sucessfull");
  })
  .catch((err) => {
    console.log("Error in connecting");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello world <3");
});

app.get("/todos", async (req, res) => {
  const getAllTodo = await TodoModal.find({});

  return res.status(200).send({
    message: " Getting  all todos ",
    data: getAllTodo,
  });
});
app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  console.log("getting id ", id);
  const getTodoWithId = await TodoModal.find({ id: id });
  console.log(getTodoWithId);

  return res.status(200).send({
    message: " Sucessfully getting todo with id ",
    data: getTodoWithId,
  });
});

app.post("/create-todo", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const count = await TodoModal.countDocuments();
  console.log(count);

  const newTodoData = new TodoModal({
    id: count,
    title: title,
    description: description,
  });
  console.log(newTodoData);
  await newTodoData.save();

  return res.status(200).send({
    msg: "Sucessfully created",
  });
});

app.post("/edit-todo/:id", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = req.params.id;

  const getTodoWithId = await TodoModal.find({ id: id });
  let get_final_id = "";
  if (getTodoWithId.length > 0) {
    get_final_id = getTodoWithId[0]._id;
  }

  if (get_final_id != "") {
    const updateValues = {
      $set: {
        title: title,
        description: description,
      },
    };

    const xyz = TodoModal.updateOne({ _id: get_final_id }, updateValues)
      .then((result) => {
        console.log("Todo updated successfully");
      })
      .catch((err) => {
        console.error("Error updating Todo:", err);
      });

    return res.status(200).send({
      msg: "Todo Updated sucessfully",
    });
  } else {
    return res.status(403).send({
      msg: "This specific id don't exist please check again and retry!!!",
    });
  }
});

app.get("/delete-todo/:id", async (req, res) => {
  const id = req.params.id;
  const getTodoWithId = await TodoModal.find({ id: id });
  let get_final_id = "";
  if (getTodoWithId.length > 0) {
    get_final_id = getTodoWithId[0]._id;
  }

  if (get_final_id != "") {
    const xyz = TodoModal.findOneAndDelete({ _id: get_final_id })
      .then((result) => {
        console.log("Todo deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting Todo:", err);
      });

    return res.status(200).send({
      msg: "Todo deleting sucessfully",
      sucess: 1,
    });
  } else {
    return res.status(403).send({
      msg: "This specific id don't exist please check again and retry!!!",
      sucess: 0,
    });
  }

  return res.status(200).send({
    msg: "Deleted todo",
  });
});

app.listen(5000, () => {
  console.log("Listning to port 5000");
});
