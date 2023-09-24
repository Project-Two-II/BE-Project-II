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
import AddQuestion from './routes/addquestion'
import CreateQuestion from './Components/CreateQuestion'
import Enroll from './routes/enroll'

import Dashboard from './Components/Dashboard/dashboard'

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
import UpdateCourse from './Components/Dashboard/updateCourse'
import UpdateChapter from './Components/Dashboard/updateChapter'
import UpdateQuestion from './Components/Dashboard/updateQuestion'
// import Delete from './Components/DeleteDialog.jsx'
import AddStudent from './Components/AddStudent'
import CourseDetailPage from './Components/CourseDetailPage'

import SubmissionReview from './Components/SubmissionReview'
import Delete from './Components/delete.jsx'

import CreateQuestionTest from './Components/CreateQuestionTest'
import ViewProgress from './Components/ViewProgress'
import StudentProgress from './Components/StudentProgress'

import ViewChapter from './Components/Dashboard/viewChapter'
import TeacherHome from './Components/Dashboard/teacherhome';

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewCourse from './Components/Dashboard/viewCourse'
import CreateCourse from './Components/CreateCourse'
import ViewQuestion from './Components/Dashboard/viewQuestion'

import ChapterDetail from './Components/ChapterDetail.jsx'

// import CreateQuestion from './Components/CreateQuestion'


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
    path: "/syllabus/:subId",
    element: <CourseDetailPage />,
    children: [
      {
        path: "chapters/:chapterId/questions",
        element: <ChapterDetail />
      },
    ]
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
  // {
  //   path: "/addquestion",
  //   element: <AddQuestion />
  // },
  {
    path:"/QuestionDetails",
    element:<QuestionDetails/>
  },
  {
    path:"/syllabus/:courseId/enroll/",
    element:<Enroll />
  },
  // {
  //   path:"/questiontestdetails",
  //   element:<QuestionTestDetails/>
  // }.
  {
    path:"/createquestiontest",
    element:<CreateQuestionTest/>
  },
  {
  path :'/viewprogress',
  element:<ViewProgress/>
  },
  // {
  //   path :'/studentprogress',
  //   element:<StudentProgress/>
  // },
  {
    path :'/dashboard',
    element:<Dashboard/>,
    children: [
      {
        path: "home/",
        element: <TeacherHome/>,
      },
      {
        path: "courses/",
        element: <ViewCourse/>,
      },
      {
        path: "createCourse/",
        element: <CreateCourse/>
      },
      {
        path: "courses/:subId/chapters/",
        element: <ViewChapter/>
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/",
        element: <ViewQuestion/>
      },
      {
        path: "courses/:subId/update/",
        element: <UpdateCourse/>
      },
      {
        path : "courses/:subId/chapters/:chapterId/update/",
        element: <UpdateChapter/>
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/:questionId/update/",
        element: <UpdateQuestion/>
      },
      
      {
        path: "courses/:subId/chapters/add/",
        element: <CreateChapter />
      },
      {
        path: "courses/:subId/addstudent/",
        element: <AddStudent />
      },
      {
        path: "courses/:subId/viewstudent/",
        element: <StudentProgress />
      },
      {
        path: "courses/:subId/viewstudent/:studentId/chapters/",
        element: <ViewProgress />
      },
      {
        path: "courses/:subId/viewstudent/:studentId/chapters/:chapterId/questions/",
        element: <SubmissionReview />
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/add/",
        element: <CreateQuestion/>
      },
      {
        path: "courses/:subId/delete/",
        element: <Delete type={"Course"}/>
      },
      {
        path: "courses/:subId/chapters/:chapterId/delete/",
        element: <Delete type={"Chapter"}/>
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/:questionId/delete/",
        element: <Delete type={"Question"}/>
      },

    ],
  },
  // {
  //   path:"submissionreview/",
  //   element :<SubmissionReview/>
  // },
  {
    path:"submissionreview/",
    element :<SubmissionReview/>
  },
  {
    path:"coursedetailpage/",
    element :<CourseDetailPage/>
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={mypersistor}>
      <RouterProvider router={router} />
    </PersistGate>

  </Provider>

)
