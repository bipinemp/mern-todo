require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Db schema and model
const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Create
app.post("/api/create", (req, res) => {
  const { title, desc } = req.body;
  try {
    Todo.create({ title, desc });
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

// Read
app.get("/api/todos", (req, res) => {
  Todo.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// Update
app.patch("/api/update/:id", (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      desc: req.body.desc,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

// Delete
app.delete("/api/delete/:id", (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => null)
    .catch((err) => console.log(err));
});
