import React from 'react'
import ReactDOM from 'react-dom/client'
import { store, mypersistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Root from './root.jsx'
import Login from './routes/login'
import Register from './routes/register'
import Editor from './routes/Editor';
import Syllabus from './routes/Syllabus'
import HomePage from './routes/HomePage'
import QuestionSolve from './routes/questionSolve.jsx'
import Profile from './routes/profile'
import Teacher from './routes/teacher'
// import AddQuestion from './Components/AddQuestion.jsx'
import CreateChapter from './Components/CreateChapter.jsx'
import CreateCourse from './Components/CreateCourse.jsx'
import ProfileEdit from './routes/editProfile'
import CodeReview from './routes/codeReview'
import CreateQuestion from './Components/AddQuestion.jsx'
import CreateTest from './Components/CreateTest.jsx'
import AddStudent from './Components/AddStudent.jsx'
import TeacherCourseDetails from './Components/TeacherCourseDetails.jsx'
import ErrorPage from './routes/ErrorPage.jsx'

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
    path: "/syllabus/:courseId/questionsolve/:questionId",
    element: <QuestionSolve />
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
  },
  {
    path: "/teacher",
    element: <Teacher />
  },
  {
    path: "/addquestion",
    element: <CreateQuestion/>
  },
  {
    path:"/createtest",
    element: <CreateTest/>
  },
  {
    path:"/addstudent",
    element:<AddStudent/>
  },
  {
    path:"/teachercoursedetails",
    element:<TeacherCourseDetails/>
  },
  {
    path:"/errorpage",
    element:<ErrorPage/>
  }

  
]);

const Loading = () =>{
  return(
    <p>Loading ...</p>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={mypersistor}>
    <RouterProvider router={router}/>
    </PersistGate>
   
  </Provider>
 
)
