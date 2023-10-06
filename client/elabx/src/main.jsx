import React from 'react'
import ReactDOM from 'react-dom/client'
import { store, mypersistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Root from './root.jsx'
import Login from './routes/login'
import Register from './routes/register'
import Editor from './routes/Editor';
// import Syllabus from './routes/Syllabus'
// import Questions from './routes/Questions'
import Home from './routes/home'
import QuestionSolve from './routes/questionSolve.jsx'
import Profile from './routes/profile'
// import Teacher from './routes/teacher'
// import Logout from './routes/logout'
// import AddCourse from './routes/addcourse'
// import AddQuestion from './routes/addquestion'
import CreateQuestion from './Components/CreateQuestion'
// import Enroll from './routes/enroll'

import Dashboard from './Components/Dashboard/dashboard'

import CreateChapter from './Components/CreateChapter.jsx'
// import CreateCourse from './Components/CreateCourse.jsx'
import ProfileEdit from './routes/editProfile'
import CodeReview from './routes/codeReview'
// import CreateQuestion from './Components/CreateQuestion.jsx'
// import AddStudent from './Components/AddStudent.jsx'
// import TeacherCourseDetails from './Components/TeacherCourseDetails.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
// import ChapterDetails from './Components/ChapterDetails.jsx'
// import QuestionDetails from './Components/QuestionDetails.jsx'
import UpdateCourse from './Components/Dashboard/updateCourse'
import UpdateChapter from './Components/Dashboard/updateChapter'
import UpdateQuestion from './Components/Dashboard/updateQuestion'
// import Delete from './Components/DeleteDialog.jsx'
import AddStudent from './Components/AddStudent'
import SelfEnroll from './Components/SelfEnroll'
import AddEnrollmentKey from './Components/addEnrollmentKey'
import CourseDetailPage from './Components/CourseDetailPage'

import SubmissionReview from './Components/SubmissionReview'
import Delete from './Components/delete.jsx'

// import CreateQuestionTest from './Components/CreateQuestionTest'
import ViewProgress from './Components/ViewProgress'
import StudentProgress from './Components/StudentProgress'
import ChapterView from './Components/ChapterView'
import QuestionList from './Components/QuestionView.jsx'
import SubmissionSucessful from './Components/SubmissionSucessful.jsx'
import ViewChapter from './Components/Dashboard/viewChapter'
import TeacherHome from './Components/Dashboard/teacherhome';
import TestFail from './Components/testfail'

// import StudentAdded from './Components/dialogboxes/StudentAdded'
// import Enrolledsucessfully from './Components/dialogboxes/EnrolledSucessfully'
// import SubjectAdded from './Components/dialogboxes/SubjectAdded'
// import CodeSubmitted from './Components/dialogboxes/prompt'
// import QuestionAdded from './Components/dialogboxes/QuestionAdded.jsx'
import Prompt from './Components/dialogboxes/prompt';



import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  createBrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";


import ViewCourse from './Components/Dashboard/viewCourse'
import CreateCourse from './Components/CreateCourse'
import ViewQuestion from './Components/Dashboard/viewQuestion'

import ChapterDetail from './Components/ChapterDetail.jsx'
import QuestionView from './Components/QuestionView.jsx'

import NotFoundPage from './routes/ErrorPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />

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
    path: "/home",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <Editor />
  },
  {
    path: "/chapterview",
    element: <ChapterView />
  },
  {
    path: "/subject/:courseId/enroll",
    element: <SelfEnroll />
  },
  {
    path: "/subject/:courseId/enroll/prompt",
    element: <Prompt promptString={"Enrolled to course"}/>
  },
  {
    path: "/syllabus/:subId",
    element: <CourseDetailPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "chapters/:chapterId/questions",
        element: <ChapterDetail />
      },
      {
        path: "viewchapters",
        element: <ChapterView />
      },
      {
        path: "viewchapters/:chapterId/viewquestions",
        element: <QuestionList />
      }
    ]
  },

  {
    path: "/syllabus/:subId/chapters/:chapterId/questionsolve/:questionId",
    element: <QuestionSolve />,
    children: [
      {
        path: "testfail",
        element: <TestFail />
      }
    ]
  },
  {
    path: "/syllabus/:courseId/enroll",
    element: <SelfEnroll />
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
    path: "/editprofile/prompt",
    element: <Prompt promptString={"Profile edited successfully"} />
  },
  {
    path: "/codereview",
    element: <CodeReview />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    // loader: TeacherGuard,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "home/",
        element: <TeacherHome />,
      },
      {
        path: "courses/",
        element: <ViewCourse />,
      },
      {
        path: "createCourse/",
        element: <CreateCourse />
      },

      {
        path: "courses/:subId/chapters/",
        element: <ViewChapter />
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/",
        element: <ViewQuestion />
      },
      {
        path: "courses/:subId/update/",
        element: <UpdateCourse />
      },
      {
        path: "courses/:subId/chapters/:chapterId/update/",
        element: <UpdateChapter />
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/:questionId/update/",
        element: <UpdateQuestion />
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
        path: "courses/:subId/addenrollmentkey/",
        element: <AddEnrollmentKey />
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
        element: <CreateQuestion />
      },
      {
        path: "courses/:subId/delete/",
        element: <Delete type={"Course"} />
      },
      {
        path: "courses/:subId/chapters/:chapterId/delete/",
        element: <Delete type={"Chapter"} />
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/:questionId/delete/",
        element: <Delete type={"Question"} />
      },
      {
        path: "createcourse/prompt",
        element: <Prompt promptString={"Course added successfully"} />
      },
      {
        path: "courses/:subId/update/prompt",
        element: <Prompt promptString={"Course updated successfully"} />
      },
      {
        path: "courses/:subId/addenrollmentkey/prompt",
        element: <Prompt promptString={"Enrollment Key Added"} />
      },
      {
        path: "courses/:subId/addstudent/prompt",
        element: <Prompt promptString={"Added student to the group"} />
      },
      {
        path: "courses/:subId/chapters/add/prompt",
        element: <Prompt promptString={"Chapter added successfully"} />
      },
      {
        path: "courses/:subId/chapters/:chapterId/update/prompt",
        element: <Prompt promptString={"Chapter updated successfully"} />
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/add/prompt",
        element: <Prompt promptString={"Question added successfully"}/>
      },
      {
        path: "courses/:subId/chapters/:chapterId/questions/:questionId/update/prompt",
        element: <Prompt promptString={"Question updated successfully"}/>
      },
      {
        path: "courses/:subId/viewstudent/:studentId/chapters/:chapterId/questions/prompt",
        element: <Prompt promptString={"Review Posted"}/>
      }
    ],

  },
  {
    path: "chapterview/",
    element: <ChapterView />
  },
  {
    path: "questionview/",
    element: <QuestionView />
  },
  // {
  //   path: "submissionsucessful/",
  //   element: <SubmissionSucessful />
  // },
  // {
  //   path: "studentadded/",
  //   element: <StudentAdded />
  // },
  // {
  //   path: "subjectadded/",
  //   element: <SubjectAdded />
  // },
  // {
  //   path: "enrolledsucessfully/",
  //   element: <Enrolledsucessfully />
  // },
  // {
  //   path: "QuestionAdded/",
  //   element: <QuestionAdded />
  // },
  // {
  //   path: "codesubmitted/",
  //   element: <CodeSubmitted />
  // }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={mypersistor}>
      <RouterProvider router={router} />
    </PersistGate>

  </Provider>

)
