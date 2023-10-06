import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Question from '../Components/Question.jsx';
import Editor from '../Components/Editor.jsx'
import Header from '../Components/header.jsx'

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as FlexLayout from "flexlayout-react";
import '../Components/flexlayout.css'
// import '../App.css';

const outputStyle = {
  padding: "20px",
  backgroundColor: "#1f1e1f",
  color: "white",
  height: "100vh"
}

const headerStyle = {
  position: "relative !important",
  zIndex : "2 !important"
}

const layoutStyle = {
  marginTop : "90px"
}

const borderStyle = {
  border: "1px solid black",
}

var json = {
  global: {tabEnableClose:false},
  borders:[
      {
        "type": "border",
        "location":"left",
        "size": 100,
        "children": []
       }
  ],
  layout: {
      "type": "row",
      "weight": 100,
      "children": [
          {
              "type": "tabset",
              "weight": 25,
              "selected": 0,
              "children": [
                  {
                    "type": "tab",
                    "name": "Question",
                    "component": "Question"
                  }
              ]
          },
          {
              "type": "tabset",
              "weight": 50,
              "selected": 0,
              "children": [
                {
                      "type": "tab",
                      "name": "Write Code",
                      "component": "Editor"
                },
              ]
          },
          {
            "type": "tabset",
            "weight": 25,
            "selected": 0,
            "children": [
            {
              "type": "tab",
              "name": "View Output",
              "component": "textarea"
            },
            ]
        }
      ]
  }
};

const  QuestionSolve = ({my_api}) => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role  = useSelector((state) => state.role);


  if(!isLoggedIn) return <Navigate to={"/login"}/>
  if(role == 1) return <Navigate to={"/dashboard/home"}/>

  const token  = useSelector((state) => state.token);


  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
 }


  const param = useParams();
  console.log(param)
  const courseId = param.subId;
  const chapterId = param.chapterId;
  const questionId = param.questionId;

  console.log(courseId, chapterId, questionId)

  // you might be wondering why I'm fetching it here.
  // yes I have to, no options left just for getting question boilerplate
  const [boilerplate, setBoilerplate] = useState('')
  function getBoilerplate() {
    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.boilerplate)
        setBoilerplate(data.boilerplate)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getBoilerplate()
  }, []);

  const EditorProps = {
    courseId, 
    chapterId,
    questionId,
    defaultLang: "cpp",
    boilerplate
  }

  const factory = (node) => {
     var component = node.getComponent();
    if (component === "textarea") {
        return (<div style = {outputStyle}  id = "output"></div>);
    }
    else if (component === "Editor") {
      return (<Editor style = {borderStyle}  props = {EditorProps} />);
    }
    else if (component === "Question") {
      return (<Question questionId={questionId} courseId={courseId}/>);
    }
  }

  return (
    <>
        <Header style={headerStyle} SearchBar={false}/>
        <FlexLayout.Layout style={layoutStyle} model={FlexLayout.Model.fromJson(json)} factory={factory}></FlexLayout.Layout>  
    </>
  )  
}

export default QuestionSolve;
