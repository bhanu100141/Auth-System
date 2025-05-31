# Authentication System

A full-featured React application demonstrating a modern authentication system with protected routes, Redux state management, and a task manager tool. The project includes user signup, login, logout, dashboard, and a fully functional task management page with smooth Tailwind CSS animations and transitions.

---

## Features

- **User Authentication**
  - Signup with name, email, password
  - Login with email and password
  - Logout functionality
  - Protected routes (Dashboard & Tools pages accessible only after login)
  - Authentication state managed with Redux Toolkit
  - User data persisted in localStorage (simulated backend)

- **Dashboard**
  - Personalized welcome message
  - Logout button with animation

- **Task Manager (Tools)**
  - Add, update, delete tasks with title, description, and completion status
  - Filter tasks by All, Pending, and Completed
  - Smooth animations and transitions on task items and buttons
  - State management via Redux
  - Simulated API calls with async delays

- **UI & Styling**
  - Tailwind CSS for styling and responsiveness
  - Smooth hover, focus, and click transitions
  - Dark-themed task manager with animated states
  - Sonner toast notifications for user feedback

---

## Tech Stack

- React (with Hooks & Functional Components)
- Redux Toolkit for state management
- React Router v6 for routing and protected routes
- Tailwind CSS for styling and animations
- Sonner for toast notifications
- JavaScript / TypeScript (adjust based on your usage)
- LocalStorage for user and task persistence (simulated backend)

---

###  Install dependencies

npm install

## Run the development server

npm start

## Project Structure

src/
├── components/
│   ├── ui/                  # Reusable UI components (Button, Input, Label)
├── features/
│   ├── auth/                # Auth slice and logic
│   ├── tools/               # Task manager slice and logic
├── pages/
│   ├── Dashboard.tsx        # Dashboard page
│   ├── Login.tsx            # Login page
│   ├── Signup.tsx           # Signup page
│   ├── Tools.tsx            # Task Manager page
├── services/
│   ├── api.ts               # Simulated API calls
├── store/
│   ├── store.ts             # Redux store setup
├── App.tsx                  # Main app and routes
├── index.tsx                # React entry point

## Usage

Signup: Create a new account with name, email, and password.

Login: Use registered email and password to login.

Dashboard: View welcome message and logout.

Tools: Manage your tasks with add, update (toggle completed), delete, and filter functionality.

Logout: Clears authentication state and redirects to login.

## Styling & Animations

Tailwind CSS classes with custom color palettes

Smooth button hover and active states with transitions

Animated task item entry and state toggles

Toast notifications for errors and success messages

Responsive layout for mobile and desktop

## Notes

This project uses localStorage as a simulated backend. Data persists in your browser.

Authentication token is randomly generated and stored in Redux state (not secure for production).

Replace the API simulation with real backend endpoints as needed.

## Future Improvements

Add real backend authentication (JWT, OAuth)

Secure password storage (hashing)

Improve accessibility (ARIA attributes)

Add task due dates and priorities

Dark/light theme toggle

###  Contact

Created by Bhanu Prasad Vepakayala - feel free to reach out via [bhanu100141@gmail.com] or GitHub Profile => https://github.com/bhanu100141