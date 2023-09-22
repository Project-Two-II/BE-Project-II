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
import Questions from './routes/Questions'
import Home from './routes/home'
import QuestionSolve from './routes/questionSolve.jsx'
import Profile from './routes/profile'
import Teacher from './routes/teacher'
import Logout from './routes/logout'
import AddCourse from './routes/addcourse'
import AddChapter from './routes/addchapter'
import AddQuestion from './routes/addquestion'
import Enroll from './routes/enroll'

import CreateChapter from './Components/CreateChapter.jsx'
// import CreateCourse from './Components/CreateCourse.jsx'
import ProfileEdit from './routes/editProfile'
import CodeReview from './routes/codeReview'
// import CreateQuestion from './Components/CreateQuestion.jsx'
import CreateTest from './Components/CreateTest.jsx'
// import AddStudent from './Components/AddStudent.jsx'
import TeacherCourseDetails from './Components/TeacherCourseDetails.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import ChapterDetails from './Components/ChapterDetails.jsx'
import QuestionDetails from './Components/QuestionDetails.jsx'

import StudentEnrollment from './Components/StudentEnrollment'
import TeacherEnrollment from './Components/TeacherEnrollment'
// import QuestionTestDetails from './Components/QuestionTestDetails'
import ViewProgress from './Components/ViewProgress'
import StudentProgress from './Components/StudentProgress'

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
    element: <Root />,

  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
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
    path: "/syllabus/:subId/chapters/:chapterId/questions",
    element: <Questions />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/syllabus/:subId/chapters/:chapterId/questionsolve/:questionId",
    element: <QuestionSolve />
  },

  {
    path: "syllabus/:subId/addchapter",
    element: <CreateChapter />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/editprofile",
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
    path: "/syllabus/:subId/chapters/:chapterId/addquestion/",
    element: <AddQuestion />
  },
  {
    path: "/createtest",
    element: <CreateTest />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/teachercoursedetails",
    element: <TeacherCourseDetails />
  },
  {
    path: "/errorpage",
    element: <ErrorPage />
  },
  {
    path: "/ChapterDetails",
    element: <ChapterDetails />
  },
  {
    path: "/QuestionDetails",
    element: <QuestionDetails />
  },
  {
    path: "/addcourse",
    element: <AddCourse />
  },
  {
    path: "/addquestion",
    element: <AddQuestion />
  },
  {
    path:"/QuestionDetails",
    element:<QuestionDetails/>
  },
  {
    path:"/enroll/:courseId",
    element:<Enroll />
  },

  {
    path:"/teacherenrollment",
    element:<TeacherEnrollment/>
  },
  // {
  //   path:"/questiontestdetails",
  //   element:<QuestionTestDetails/>
  // }.
  {
  path :'/viewprogress',
  element:<ViewProgress/>
  },
  {
    path :'/studentprogress',
    element:<StudentProgress/>
    },



>>>>>>> dee1aae (progress added)
]);



ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={mypersistor}>
      <RouterProvider router={router} />
    </PersistGate>

  </Provider>

)
