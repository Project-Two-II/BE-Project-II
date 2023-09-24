import React from 'react';
import { useParams } from 'react-router-dom';
import Question from '../Components/Question.jsx';
import Editor from '../Components/Editor.jsx'
import Header from '../Components/header.jsx'

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
  const param = useParams();
  console.log(param)
  const courseId = param.courseId;
  const questionId = param.questionId;

  const factory = (node) => {
     var component = node.getComponent();
    if (component === "textarea") {
        return (<textarea style = {outputStyle} className="editorFooter" id = "output" placeholder='Output'></textarea>);
    }
    else if (component === "Editor") {
      return (<Editor style = {borderStyle} defaultLang = "cpp" api = {my_api} />);
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
