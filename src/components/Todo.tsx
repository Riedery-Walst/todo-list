import { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  function addTodo() {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        text: newTodo,
        isDone: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  }

  function deleteTodo(id: number) {
    const updatedTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  }

  function toggleTodo(id: number) {
    const updatedTodos = todos.map(function (todo) {
      return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
    });
    setTodos(updatedTodos);
  }

  function editTodo(id: number, newText: string) {
    const updatedTodos = todos.map(function (todo) {
      return todo.id === id ? { ...todo, text: newText } : todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(function (todo) {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              onToggle={() => toggleTodo(todo.id)}
              onEdit={(newText) => editTodo(todo.id, newText)}
            />
          );
        })}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default TodoList;
