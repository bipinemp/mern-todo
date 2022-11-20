import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({});

  const navigate = useNavigate();

  // Get all todos
  useEffect(() => {
    axios
      .get("/api/todos")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`/api/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  // Update a todo
  const handleUpdate = (todo) => {
    setIsOpen(true);
    setUpdatedTodo(todo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedTodo = () => {
    axios
      .patch(`/api/update/${updatedTodo._id}`, updatedTodo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setIsOpen(false);
    window.location.reload();
  };
  return (
    <div
      style={{
        width: "60%",
        margin: "auto auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        marginBottom: "40px",
      }}
    >
      <h1>Todos</h1>
      <button
        style={{
          width: "20%",
          padding: "10px 15px",
          backgroundColor: "#405cf5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          margin: "0px auto",
          marginBottom: "10px",
        }}
        onClick={() => navigate(-1)}
      >
        BACK
      </button>

      {todos ? (
        <>
          {todos.map((todo) => {
            return (
              <div
                key={todo._id}
                style={{
                  width: "60%",
                  margin: "0px auto",
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: "#deeaee",
                  borderLeft: "30px solid crimson",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                }}
              >
                <h3
                  style={{ letterSpacing: "1px", textTransform: "uppercase" }}
                >
                  {todo.title}
                </h3>
                <p>{todo.desc}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1em",
                  }}
                >
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
                    onClick={() => handleUpdate(todo)}
                  >
                    UPDATE
                  </button>
                  <button
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "crimson",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    onClick={() => deleteTodo(todo._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            marginTop: "20px",
          }}
        >
          <input
            name="title"
            placeholder="Title..."
            style={{ padding: "5px 10px", marginBottom: "10px" }}
            value={updatedTodo.title ? updatedTodo.title : ""}
            onChange={handleChange}
          />
          <input
            name="desc"
            placeholder="Description..."
            style={{ padding: "5px 10px", marginBottom: "10px" }}
            value={updatedTodo.desc ? updatedTodo.desc : ""}
            onChange={handleChange}
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
            onClick={saveUpdatedTodo}
          >
            SAVE CHANGES
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Todos;
