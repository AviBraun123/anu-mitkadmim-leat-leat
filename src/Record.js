import { type } from "@testing-library/user-event/dist/type";
import info from "./Info";
import "./Record.css";

let mediaRecorder;
let audio;
let audioUrl;
let flag = false;

function save(idx, user,sender){
    let today = new Date();
    var hour = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
    info[idx].chats[user].msgArr.push({type: "audio", data: audioUrl, time:{month: today.getMonth(), day: today.getDate(), hour: hour}, side:0});
    document.getElementById("send").style.visibility = 'hidden';
    document.getElementById("play").style.visibility = 'hidden';
    mediaRecorder = null;
    sender();
}

function start(){
    // check if the broswer support audio recording
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            flag = false;

            const data = [];
            
            mediaRecorder.ondataavailable = event => data.push(event.data);
            mediaRecorder.onstop = () => {
                const audioB = new Blob(data);
                audioUrl = URL.createObjectURL(audioB);
                audio = new Audio(audioUrl); 
                // save the audio 
                mediaRecorder = null;
                flag = true;
            }
        })
        .catch(err => {
                console.log("failed to record!");
                console.log(err.name, err.message);
            });
        }
    }

function stop() {
    if(mediaRecorder){
        mediaRecorder.stop();
        document.getElementById("send").style.visibility = "visible";
        document.getElementById("play").style.visibility = "visible";
    }
}

function play() {
    if(audio && flag){
        audio.play();
    }
}

function Record({idx, user, sender}) {
        return (
        <>
            <div className="modal-header" id = "modalll">
                <h5 className="modal-title" id="staticBackdropLabel">
                    {" "}
                    Let me hear some NOISE!!!{" "}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div>
                <br />
                <center>
                  <span>
                      <button id="play" onClick={play} style = {{visibility: "hidden"}}>
                      <center> <i className="bi bi-file-earmark-play"></i> </center>
                      </button>
                  </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                      <button id="send" onClick={() => {save(idx, user, sender)}} style = {{visibility: "hidden"}} data-bs-dismiss="modal" aria-label="Close">
                        <center> <i className="bi bi-send-fill"></i> </center>
                      </button>
                  </span>
                </center>
            </div>
            <div>
                <br />
                <center>
                    <button id="btnStart" onClick={start}>START RECORDING</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="btnStop" onClick={stop}>STOP RECORDING</button>
                </center>
            </div>
            <br/>
        </>
    );
  }
  
  export default Record;