import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./main.css"
import SignIn from './pages/SignIn/SignIn.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Form from './pages/Guided Profile Completion/Form.jsx'
import Profile from './pages/Profile/Profile.jsx'
import { AuthProvider } from './context/Auth.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
