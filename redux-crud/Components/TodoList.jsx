import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "../slices/todoSlice";
import { useState } from "react";

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSave = (id) => {
    if (editText.trim() === "") return;
    dispatch(editTodo({ id, newText: editText }));
    setEditingId(null);
    setEditText("");
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {editingId === todo.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSave(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {todo.text}
              <button onClick={() => dispatch(toggleTodo(todo.id))}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
