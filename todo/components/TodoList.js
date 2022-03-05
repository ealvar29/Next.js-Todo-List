import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

export default function Todos({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };
  const addTodo = async (taskText) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setError("");
            setNewTaskText(e.target.value);
          }}
        />
        <button className="btn-black" onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
