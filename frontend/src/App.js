import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div style={{ width: "60%", margin: "auto auto", textAlign: "center" }}>
      <h1>HOME PAGE</h1>
      <button
        onClick={() => navigate("/create")}
        style={{
          padding: "10px 15px",
          backgroundColor: "crimson",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        CREATE TODO
      </button>
    </div>
  );
}

export default App;
