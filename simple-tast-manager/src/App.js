import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./taskSlice";
import "./index.css";

function App() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);

  function handleAddTask() {
    // Don't add empty tasks
    if (input.trim() === "") return;

    dispatch(addTask(input.trim()));
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">📝 Task List</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input"
          />
          <button onClick={handleAddTask} className="button">
            Add Task
          </button>
        </div>

        {/* Show a message if there are no tasks yet */}
        {tasks.length === 0 && (
          <p className="empty">No tasks yet. Add one above!</p>
        )}

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span className="task-number">{index + 1}</span>
              <span className="task-text">{task}</span>
            </li>
          ))}
        </ul>

        {/* Show task count when there are tasks */}
        {tasks.length > 0 && (
          <p className="task-count">{tasks.length} task{tasks.length !== 1 ? "s" : ""} total</p>
        )}
      </div>
    </div>
  );
}

export default App;