export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // store hashed in real app
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
