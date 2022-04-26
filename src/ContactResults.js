import info from "./Info";
import "./ContactResults.css";

function ContactResults({ users , set, setError}) {

    const userFind = function(user){
        for(var i in info) {
            if (info[i].username === user) {
                return info[i].profPic;
            }
        }
    }

    const print = function(userpick){
        setError("");
        var arr=document.getElementsByClassName("contactButton");
        for (var elm in arr) {
            if (arr[elm].id === userpick) {
                arr[elm].style="background: rgb(156, 222, 183)";
                set(userpick);
            } else {
                arr[elm].style="background: rgb(239, 239, 239)";
            }
        }
    }

    const contactList = users.map((user, key) => {
        return <button key={key} onClick={() => {print(user)}} className="contactButton col-12" id={user}>
                  <img src={userFind(user)} className="searchPic"/> 
                  <span className="userprint"> {user} </span>  
               </button>
    });

    return (
        <div className="dudidu">
            {contactList}
        </div>
        );
}

export default ContactResults;