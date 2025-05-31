import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const Tools: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filtered = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    return task.completed;
  });

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error('Title and Description are required');
      return;
    }
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      completed: false,
    };
    const newTasks = [newTask, ...tasks];
    saveTasks(newTasks);
    setNewTitle('');
    setNewDescription('');
    toast.success('Task added');
  };

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    saveTasks(newTasks);
    toast.success('Task deleted');
  };

  const toggleCompleted = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(newTasks);
  };

  return (
    <div className="container">
      <Toaster position="top-right" />
      <h1 className="title">Task Manager</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          className="input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="input description-input"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button onClick={handleAddTask} className="add-button">
          Add Task
        </Button>
      </div>

      <div className="filter-group">
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filtered.length === 0 && (
          <p className="no-tasks">No tasks found.</p>
        )}
        {filtered.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-content">
              <h3
                className="task-title"
                onClick={() => toggleCompleted(task.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleCompleted(task.id);
                }}
              >
                {task.title}
              </h3>
              <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(task.id)}
                className="delete-button"
                aria-label={`Delete task ${task.title}`}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;
