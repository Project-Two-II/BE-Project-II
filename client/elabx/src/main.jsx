import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './root.jsx'
import Login from './routes/login.jsx'
import Register from './routes/register.jsx'
import Editor from './routes/Editor.jsx';

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
