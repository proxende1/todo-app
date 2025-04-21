import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem('filter') || 'all';
  });
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState(() => {
    return localStorage.getItem('title') || '';
  });
  const [description, setDescription] = useState(() => {
    return localStorage.getItem('description') || '';
  });


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));}, [todos]);


  useEffect(() => {
    localStorage.setItem('filter', filter);}, [filter]);

  useEffect(() => {
    localStorage.setItem('title', title);
    localStorage.setItem('description', description);}, [title, description]);

  const addTodo = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTitle('');
    setDescription('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Task</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?"/>
          </div>
          <div className='todo-input-item'>
            <label>Discription</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primarybtn' onClick={addTodo}>Add</button>
            <button type='button' className='secondarybtn' onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <div className='todo-list'>
          {filteredTodos.map(todo => (
            <div className='todo-list-item' key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
