import { Task } from '../features/tools/toolsSlice';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async getTasks(): Promise<Task[]> {
    await delay(500);
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  },

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    await delay(500);
    const newTask: Task = { ...task, id: crypto.randomUUID() };
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return newTask;
  },

  async updateTask(updated: Task): Promise<Task> {
    await delay(500);
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((t) => t.id === updated.id);
    if (index !== -1) tasks[index] = updated;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    await delay(500);
    let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
};
