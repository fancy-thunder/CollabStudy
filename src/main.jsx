import { StrictMode, useEffect } from 'react'
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
import Community from './pages/Community/Community.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react'
import AuthContext from './context/Auth.jsx'
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
    path: "/form/:userId",
    element: <Form />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
  {
    path : "/community",
    element : <Community />
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
