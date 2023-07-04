import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root.jsx'
import Login from './routes/login'
import Register from './routes/register'
import Editor from './routes/Editor';
import Syllabus from './routes/Syllabus'
import HomePage from './routes/HomePage'
import QuestionSolve from './routes/questionSolve.jsx'
import Header from './Components/header.jsx'
import Footer from './Components/footer.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/editor",
    element: <Editor />
  },
  {
    path: "/syllabus",
    element: <Syllabus />
  },
  {
    path: "/homepage",
    element: <HomePage />
  },
  {
    path: "/questionsolve",
    element: <QuestionSolve />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router}/>
    <Footer />
  </React.StrictMode>,
)
