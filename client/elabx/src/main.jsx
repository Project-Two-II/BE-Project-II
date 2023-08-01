import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'

import Root from './root.jsx'
import Login from './routes/login'
import Register from './routes/register'
import Editor from './routes/Editor';
import Syllabus from './routes/Syllabus'
import HomePage from './routes/HomePage'
import QuestionSolve from './routes/questionSolve.jsx'
import Profile from './routes/profile'
import AddQuestion from './Components/AddQuestion.jsx'
import CreateChapter from './Components/CreateChapter.jsx'
import CreateCourse from './Components/CreateCourse.jsx'
import ProfileEdit from './routes/editProfile'
import CodeReview from './routes/codeReview'

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    path: "/syllabus/:id",
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
  {
    path: "/addquestion",
    element: <AddQuestion />
  },
  {
    path: "/createchapter",
    element: <CreateChapter />
  },
  {
    path: "/createcourse",
    element: <CreateCourse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path:"/editprofile",
    element: <ProfileEdit />
  },
  {
    path: "/codereview",
    element: <CodeReview />
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
 
)
