'use client';
import { TodoTable } from '@/app/components/TodoTable/TodoTable';
import { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tags: string[];
  endDate: string;
  startDate: string;
  email: string;
  phone: string;
  categories: string[];
  color: string;
  attachment: File | null; // add this
}

const initalFormData: ITodo = {
  id: '',
  title: "",
  description: '',
  startDate: '',
  endDate: '',
  tags: [],
  categories: [],
  status: '',
  email: '',
  phone: '',
  priority: '',
  color: '',
  attachment: null
}

export default function Home() {

  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [todo, setTodo] = useState<ITodo>(initalFormData);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todos: any = Object.fromEntries(formData.entries());
    todos.tags = formData.getAll('tags');
    todos.categories = formData.getAll("categories");
    todos.startDate = todos.startDate ? new Date(todos.startDate).toISOString() : new Date().toISOString();
    todos.endDate = todos.endDate ? new Date(todos.endDate).toISOString() : new Date().toISOString();
    todos.modifiedAt = new Date().toISOString();
    console.log(todos);

    const { attachment, ...submitData } = todos;
    if (!isEdit)
      await postTodo(submitData);
    else
      await editTodo({ ...submitData , id: todo.id});
  }

  const postTodo = async (_todo: ITodo) => {
    const data = JSON.stringify(_todo);
    try {
      const response = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      const res = await response.json();

      await getTodos();

      console.log(res);
    } catch (error) {
      console.log({ error })
    }
  }

  const getTodos = async () => {
    const response = await fetch('http://localhost:4000/todo');
    const todos = await response.json();
    setTodos(todos);
  }

  const deleteTodo = async (id: string) => {
    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: 'DELETE'
    });
    const res = await response.json();
    if (res)
      await getTodos();
  }

  const editTodo = async (_todo: ITodo) => {
    console.log("_todo",_todo);
    const data = JSON.stringify(_todo);
    const response = await fetch(`http://localhost:4000/todo/${_todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    console.log("response",response)
    const res = await response.json();
    if (res)
      await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <TodoForm handleOnSubmit={handleOnSubmit} todo={todo} isEdit={isEdit} />
      </div>
      <div>
        <TodoTable todos={todos} onDelete={deleteTodo} onEdit={setTodo} setIsEdit={setIsEdit} />
      </div>
    </div>
  );
}
