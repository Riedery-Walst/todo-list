import { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    isDone: boolean;
  };
  onDelete: () => void;
  onToggle: () => void;
  onEdit: (newText: string) => void;
}

function TodoItem({ todo, onDelete, onToggle, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(todo.text);

  const handleEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <li style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          {todo.text}
          <button onClick={onDelete}>Delete</button>
          <button onClick={onToggle}>Toggle</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
