import "./ChatDialog.css"
import info from "./Info";
import React, { useState } from 'react';
import Record from "./Record";


export default function ChatDialog({masterIdx , user, divList, setList, flag}) {

    
    if(flag){
      flag = 0;
      setList("");
    }
    
    var masterMsgArr=[], msgSide;
    
    for(var i in info[masterIdx].chats) {
        if (info[masterIdx].chats[i].user === user) {
            masterMsgArr = info[masterIdx].chats[i].msgArr;
            break;
        }
    }

    var userNickname, userProfPic;

    for(var j in info) {
      if (info[j].username === user) {
        userNickname = info[j].nickname;
        userProfPic = info[j].profPic;
        break;
      }
    }

    const play = function(audioURL) {
      let audio = new Audio(audioURL); 
      audio.play();
    }
    
    
    const msgSort = function(){
        let divArr=[];
        for(let msg in masterMsgArr) {
          (masterMsgArr[msg].side === 0) ? msgSide = "left" : msgSide = "right";
            if(masterMsgArr[msg].type === "text") {
                divArr.push(<div className={msgSide}><div className="actualMsg">{masterMsgArr[msg].data}</div><div className="msgTime">
                {masterMsgArr[msg].time.hour}
              </div></div>);
                divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "audio") {
              divArr.push(<div className={msgSide}><span className="actualMsg audioMsg">
              <audio controls> 
                <source src= {masterMsgArr[msg].data} type="audio/mpeg"/>
              </audio>
              </span><div className="msgTime">
              {masterMsgArr[msg].time.hour}
            </div></div>);
              divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "video") {
              divArr.push(<div className={msgSide}><span className="actualMsg fileMsg">
              <video className="actualImgMsg" controls> <source src={masterMsgArr[msg].data} type="video/mp4"/> </video>
              </span><div className="msgTime">
              {masterMsgArr[msg].time.hour}
            </div></div>);
              divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "image") {
              divArr.push(<div className={msgSide}><span className="actualMsg fileMsg"> <img src={masterMsgArr[msg].data} alt="..." className="actualImgMsg"/>
              </span><div className="msgTime">
              {masterMsgArr[msg].time.hour}
            </div></div>);
              divArr.push(<br className="break"/>);
            }
        }
        setList(divArr);
        document.getElementById("msgBox").scrollTop = document.getElementById("msgBox").scrollHeight;
        return(divArr);
    }

    const msgSortInit = function(){
        let divArr=[];
        for(let msg in masterMsgArr) {
          (masterMsgArr[msg].side === 0) ? msgSide = "left" : msgSide = "right";
            if(masterMsgArr[msg].type === "text") {
                divArr.push(<div className={msgSide}>
                              <div className="actualMsg">
                                {masterMsgArr[msg].data} 
                              </div> 
                              <div className="msgTime">
                                {masterMsgArr[msg].time.hour}
                              </div> </div>);
                divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "audio") {
                divArr.push(<div className={msgSide}><span className="actualMsg audioMsg">
                <audio controls>
                  <source src= {masterMsgArr[msg].data} type="audio/mpeg"/>
                </audio>
                </span><div className="msgTime">
                {masterMsgArr[msg].time.hour}
              </div></div>);
                divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "video") {
              divArr.push(<div className={msgSide}><span className="actualMsg fileMsg">
              <video className="actualImgMsg" controls> <source src={masterMsgArr[msg].data} type="video/mp4"/> </video>
              </span><div className="msgTime">
              {masterMsgArr[msg].time.hour}
            </div></div>);
              divArr.push(<br className="break"/>);
            } else if (masterMsgArr[msg].type === "image") {
              divArr.push(<div className={msgSide}><span className="actualMsg fileMsg"> <img src={masterMsgArr[msg].data} alt="..." className="actualImgMsg"/>
              </span><div className="msgTime">
              {masterMsgArr[msg].time.hour}
            </div></div>);
              divArr.push(<br className="break"/>);
            }
        }
        return(divArr);
    }

    const sender = function(){
      if(document.getElementById("input").value !== "") {
        var today = new Date();
        var hour = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
        info[masterIdx].chats[i].msgArr.push({type:"text", data: document.getElementById("input").value, time:{month: today.getMonth(), day: today.getDate(), hour: hour}, side:0});
        masterMsgArr = info[masterIdx].chats[i].msgArr;
        console.log(info);
        document.getElementById("input").value = "";
        return (msgSort());
      }
    }
    
    const fileSender = function(fileType){
      var today = new Date();
      var hour = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
      info[masterIdx].chats[i].msgArr.push({type:fileType, data: file, time:{month: today.getMonth(), day: today.getDate(), hour: hour}, side:0});
      masterMsgArr = info[masterIdx].chats[i].msgArr;
      document.getElementsByClassName("upupup").value = "";
      
      return (msgSort());
    }

    const fileHandler = (e) => {
      e.preventDefault();
      setFile(URL.createObjectURL(e.target.files[0]));
    } 
    const [file, setFile] = useState(null);  

    const [uploadError, setUploadError] = useState("");

    const upload = function(fileType){
      setUploadError("please pick a file first");
      if(file != null) {
        setUploadError("");
        fileSender(fileType);
      }
    }
    
    

    return (
      <>
        <div className="dialogScreen">
          <h1> <img className="partnerPic" src={userProfPic} alt=""/> {userNickname} chat</h1>
        </div>

        <div className="msgBox" id="msgBox">
          <br />
          {divList === "" ? msgSortInit() : ""}
          {divList}
        </div>

        <div className="buttomLine">
          &nbsp; &nbsp;
          <span className="btn-group dropup">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-paperclip"> </i>
            </button>{" "}
            <ul className="dropdown-menu">
              <li key="1">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item "
                  data-bs-toggle="modal"
                  data-bs-target="#Record"
                >
                  {" "}
                  <span className="item">Record</span>{" "}
                  <i className="bi bi-mic-fill emoji" id="recordButton"></i>{" "}
                </button>
              </li>
              <li key="2">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#videoUpload"
                >
                  {" "}
                  <span className="item">Video</span>{" "}
                  <i className="bi bi-camera-reels-fill emoji"></i>{" "}
                </button>
              </li>
              <li key="3">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#imageUpload"
                >
                  {" "}
                  <span className="item">Image</span>{" "}
                  <i className="bi bi-images emoji"></i>{" "}
                </button>
              </li>
            </ul>
          </span>
          &nbsp;
          <input type="text" className="sendbox" id="input" /> &nbsp;
          <button
            type="button"
            onClick={sender}
            id="inputSend"
            className="button"
          >
            {" "}
            <i className="bi bi-send"></i>{" "}
          </button>
        </div>

        <div
          className="modal fade"
          id="Record"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <Record idx={masterIdx} user={i} sender={msgSort} />
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="videoUpload"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  And the Oscar goes to...
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="file" accept="video/*" onChange={fileHandler} className="upupup"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={()=>{upload("video")}} data-bs-dismiss={
                  (uploadError !== "please pick a file first") ? "modal" : ""
                }>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="imageUpload"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Say Cheese!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="file" accept="image/*" onChange={fileHandler} className="upupup"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={()=>{upload("image")}} data-bs-dismiss={
                  (uploadError !== "please pick a file first") ? "modal" : ""
                }>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }