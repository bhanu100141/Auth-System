import { Task } from '../features/tools/toolsSlice';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Get unique key based on full user info saved in localStorage
function getUserKey(): string {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    console.error('No user found in localStorage');
    throw new Error('No logged-in user found in localStorage');
  }
  const user = JSON.parse(userStr);
  if (!user || !user.email) {
    console.error('Invalid user data in localStorage:', user);
    throw new Error('No logged-in user found in localStorage');
  }
  console.log('getUserKey called for user email:', user.email);
  return `tasks_${user.email.toLowerCase()}`; // normalize email case
}

export const api = {
  async getTasks(): Promise<Task[]> {
    await delay(500);
    const key = getUserKey();
    const tasks = JSON.parse(localStorage.getItem(key) || '[]');
    console.log(`Fetched tasks for key: ${key}`, tasks);
    return tasks;
  },

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    await delay(500);
    const key = getUserKey();
    const newTask: Task = { ...task, id: crypto.randomUUID() };
    const tasks: Task[] = JSON.parse(localStorage.getItem(key) || '[]');
    tasks.push(newTask);
    localStorage.setItem(key, JSON.stringify(tasks));
    console.log(`Added new task for key: ${key}`, newTask);
    return newTask;
  },

  async updateTask(updated: Task): Promise<Task> {
    await delay(500);
    const key = getUserKey();
    const tasks: Task[] = JSON.parse(localStorage.getItem(key) || '[]');
    const index = tasks.findIndex((t) => t.id === updated.id);
    if (index !== -1) tasks[index] = updated;
    localStorage.setItem(key, JSON.stringify(tasks));
    console.log(`Updated task for key: ${key}`, updated);
    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    await delay(500);
    const key = getUserKey();
    let tasks: Task[] = JSON.parse(localStorage.getItem(key) || '[]');
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem(key, JSON.stringify(tasks));
    console.log(`Deleted task ${id} for key: ${key}`);
  },
};
