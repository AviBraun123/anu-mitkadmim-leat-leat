import Search from './Search';
import React, { useEffect, useState, useRef } from 'react';
import ChatListResults from './ChatListResults';
import "./chat.css";
import info from "./Info";
import Addcontact from './Addcontact';
import ContactResults from './ContactResults';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ConveCricket from './ConveCricket';
import ChatDialog from './ChatDialog';
import $ from "jquery";

export default function Chat() {
    
    let flag = true;
    let params = new URLSearchParams(document.location.search);
    const myUser = params.get("username");
    var i;
    var myUserIdx;
    var chats;
    var users=[];
    for (i in info) {
        if (info[i].username === myUser) {
            chats = info[i].chats;
            myUserIdx = i;
        } else {
            users.push(info[i].username);
        }
    }
     
    const remove = function() {
        for (i in chats) {
            var index = users.indexOf(chats[i].user);
            if (index !== -1) {
                users.splice(index, 1);
            }
        }
    }
    
    remove();
    
    const [listOfChats, setSearchQuery] = useState(chats);
    
    const doSearch = function (s) {
        setSearchQuery(chats.filter((chat) => {
            for (var j in info) {
                if (info[j].username === chat.user) {
                    var nickname = info[j].nickname;
                    break;
                }
            }
            
            return(nickname.includes(s))}));
        }

    const [contact, setUser] = useState("");
        
    const [listOfContacts, setContactQuery] = useState([]);

    const [error, setError] = useState("pick contact to add");

    const contactSearch = function (s) {
      setClicked(false);
        if (s === "") {
            setContactQuery([]);
        } else {
        setContactQuery(users.filter((user) => user.startsWith(s)));
        }
    }

    // const closeRef = useRef(null);

    const addToChat = function() {
        setError("pick contact to add");
        if (contact !== "") {
            info[myUserIdx].chats.unshift({user: contact, msgArr:[]});
            chats = info[myUserIdx].chats;
            doSearch("");
            setUser("");
            contactSearch("");
            remove();
            flag = false;
            document.getElementById("inputForContacts").value = "";
            // chatClicked.current = false;
        } else {
            setError("pick contact to add");
        }
    }

    // const chatClicked = useRef(false);

    const [chatClicked, setClicked] = useState(false);
    
    const [theChosenOne, setChosenOne] = useState("");

    // useEffect(
    //   () => {
    //     setClicked(true);
        
    //     console.log(theChosenOne);
    //   },
    //   [theChosenOne, chatClicked],
    // );

    const [divList, setList] = useState("");
    
    return (
      <div className="container">
      <div className="row justify-content-start">
        <div className=" col-4" id="contactbox">

          <div id="search_add">
            <div className=" fs-1 plusoneinner">
            <span className='userPicBase'> <img className='userPic' src={info[myUserIdx].profPic} alt="..."/> </span>
              Hi {myUser} <i className="bi bi-emoji-smile-upside-down"></i>
              <button
                type="button"
                className="btn btn-outline-secondary plusone"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-person-plus-fill"></i>
                <span className="visually-hidden">Button</span>
              </button>
            </div>
            <Search doSearch={doSearch} />
          </div>

          <div id="chatList">
            <ChatListResults chating={listOfChats} setChosen={setChosenOne} setClicked={setClicked} />
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add new contact
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Addcontact doSearch={contactSearch} />
                  <ContactResults users={listOfContacts} set={setUser} setError={setError}/>
                </div>
                <div className="modal-footer">
                  {flag === true ? (
                    <span>
                      <h5>{error}</h5>
                    </span>
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    className="btn btn-success "
                    onClick={addToChat}
                    id="addButton"
                    data-bs-dismiss={
                      (error !== "pick contact to add") ? "modal" : ""
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-8 right-half' id='chatBox'>
          {
            (chatClicked)? (<ChatDialog masterIdx={myUserIdx} user={theChosenOne} divList={divList} setList={setList} flag={1}/>):<ConveCricket />
          }
        </div>
        </div>
        <h5 className='top-right'>
          CriChæt
        </h5>
        <h5 className='bottom-left'>
          CriChæt
        </h5>
        <span className='top-left'>
          <img src='./cricket.gif' className='top-left' alt="..."/>
        </span>
        <span className='bottom-right'>
          <img src='./cricket.gif' className='bottom-right' alt="..."/>
        </span>
      </div>
    );
}