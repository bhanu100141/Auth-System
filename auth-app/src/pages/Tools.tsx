import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const Tools: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  const email = currentUser?.email;
  const tasksKey = `tasks_${email}`;

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (!email) return [];
    const stored = localStorage.getItem(tasksKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const filtered = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    return task.completed;
  });

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    if (email) {
      localStorage.setItem(tasksKey, JSON.stringify(newTasks));
    }
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
    saveTasks([newTask, ...tasks]);
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
    toast.success('Task updated');
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const saveEdit = (id: number) => {
    if (!editedTitle.trim() || !editedDescription.trim()) {
      toast.error('Both fields are required');
      return;
    }
    const newTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: editedTitle.trim(), description: editedDescription.trim() }
        : task
    );
    saveTasks(newTasks);
    setEditingId(null);
    toast.success('Task updated');
  };

  useEffect(() => {
    if (!email) {
      setTasks([]);
    }
  }, [email]);

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
        {filtered.length === 0 && <p className="no-tasks">No tasks found.</p>}
        {filtered.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="flex items-start gap-4 w-full">
              {/* Checkbox at the start */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
                className="mt-1 w-5 h-5"
              />

              {/* Task Content */}
              <div className="flex-1">
                {editingId === task.id ? (
                  <div
                    className="edit-inputs"
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <input
                      type="text"
                      className="input"
                      style={{ marginBottom: 0, flex: '1 1 200px' }}
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                      className="input"
                      style={{ marginBottom: 0, flex: '1 1 300px', minHeight: '60px', resize: 'vertical' }}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-desc">{task.description}</p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {editingId === task.id ? (
                  <Button size="sm" onClick={() => saveEdit(task.id)}>
                    Save
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => startEditing(task)}>
                    Edit
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;
