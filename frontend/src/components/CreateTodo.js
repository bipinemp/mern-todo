import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTodo = () => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Post/Create  a todo
  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post("/api/create", todo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("todos");
  };
  return (
    <div style={{ width: "60%", margin: "auto auto", textAlign: "center" }}>
      <h1>CREATE A TODO</h1>
      <form className="todoform" onSubmit={handleClick}>
        <input
          name="title"
          placeholder="Title..."
          style={{ padding: "5px 10px", marginBottom: "10px" }}
          onChange={handleChange}
          value={todo.title}
        />
        <input
          name="desc"
          placeholder="Description..."
          style={{ padding: "5px 10px", marginBottom: "10px" }}
          onChange={handleChange}
          value={todo.desc}
        />

        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#405cf5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          CREATE TODO
        </button>
      </form>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 15px",
          backgroundColor: "crimson",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        GO BACK
      </button>
    </div>
  );
};

export default CreateTodo;
