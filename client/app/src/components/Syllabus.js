import React from 'react'
import '../App.css'
import arrowIcon from '../media/arrowicon.png'

const iconStyle = {
    width: "5%",
    height: "80%"
}
const iconStyleSmall = {
    width: "5%",
    height: "70%"
}
const mainStyle = {
    backgroundColor: "#1F2334",
    display: "flex",
    flexDirection: "column",
    color: "white"
}
const chapterStyle = {
    height: "8vh",
    width: "80%",
    margin: "10px auto",
    fontSize: "1.2rem",
    display: "flex"
}
const questionStyle = {
    height: "8vh",
    width: "70%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex"
}
const descStyle = {
    height: "8vh",
    width: "60%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column"
}
const textStyle = {
    padding: '8px'
}

const completedBtnStyle = {
    backgroundColor: "#46A11C"
}
const solveBtnStyle = {
    backgroundColor: "yellow"
}
const lockBtnStyle = {
    backgroundColor: "red"
}

function Syllabus() {
    return (
        <div className="main" style={mainStyle}>
            <div className="chapterList">
            <div className="chapters" style={chapterStyle}>
                <img src={arrowIcon} style={iconStyle}></img>
                <span style={textStyle}>1. Chapter 1</span>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>1.1 Question 1</span>
            </div>
            <div className="description">
                <div className="quesDesc" style={descStyle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
                </div>
                <button className="statusBtn" style={completedBtnStyle}>Completed</button>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>1.2 Question 2</span>
            </div>
            <div>
            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn" style={solveBtnStyle}>Solve This</button>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>1.2 Question 3</span>
            </div>
            <div>

            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn" style={lockBtnStyle}>Locked</button>
            </div>
            </div>
            
            <div className="chapterList">
            <div className="chapters" style={chapterStyle}>
                <img src={arrowIcon} style={iconStyle}></img>
                <span style={textStyle}>2. Chapter 2</span>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>2.1 Question 1</span>
            </div>
            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn">Button</button>
            </div>

            <div className="chapterList">
            <div className="chapters" style={chapterStyle}>
                <img src={arrowIcon} style={iconStyle}></img>
                <span style={textStyle}>3. Chapter 3</span>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>3.1 Question 1</span>
            </div>
            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn">Button</button>

            </div>

            <div className="chapterList">
            <div className="chapters" style={chapterStyle}>
                <img src={arrowIcon} style={iconStyle}></img>
                <span style={textStyle}>4. Chapter 4</span>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>4.1 Question 1</span>
            </div>
            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn">Button</button>
            </div>

            <div className="chapterList">
            <div className="chapters" style={chapterStyle}>
                <img src={arrowIcon} style={iconStyle}></img>
                <span style={textStyle}>5. Chapter 5</span>
            </div>

            <div className="questions" style={questionStyle}>
                <img src={arrowIcon} style={iconStyleSmall}></img>
                <span style={textStyle}>5.1 Question 1</span>
            </div>
            <div className="quesDesc" style={descStyle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sequi cum eveniet placeat assumenda provident porro ea quasi quibusdam expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ratione.
            </div>
            <button className="statusBtn">Button</button>

            </div>
        </div>
    )
}

export default Syllabus