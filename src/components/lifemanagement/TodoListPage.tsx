import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from 'lucide-react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    const newTodo: TodoItem = {
      id: Date.now(), // Simple ID generation
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center font-cinzel text-rome-terracotta">待辦事項 (Todo List)</h1>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter a new todo item..."
          className="flex-grow border-gray-300 dark:border-gray-600 focus:border-rome-terracotta dark:focus:border-rome-terracotta focus:ring-1 focus:ring-rome-terracotta dark:focus:ring-rome-terracotta"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <Button onClick={addTodo} className="bg-rome-terracotta hover:bg-rome-terracotta/90">
          Add Todo
        </Button>
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todo items yet. Add some!</p>
      )}

      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center p-4 rounded-lg shadow transition-all ${
              todo.completed ? 'bg-gray-100 dark:bg-gray-700 opacity-70' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="mr-4 data-[state=checked]:bg-rome-terracotta border-rome-terracotta focus:ring-rome-terracotta"
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-grow cursor-pointer ${
                todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {todo.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/50"
              aria-label="Remove todo"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListPage;
