//get user ID of the sender
let arr1 = [];
function convertUsers(){
  arr1 = $.map(multiplayer.users, function (value) { return value; });
};

function getCallsignOfLastMessage(){
  let lastMessageSent = document.querySelector("#geofs-ui-3dview > div.geofs-canvas-mouse-overlay > div.geofs-chat-messages.geofs-authenticated").children[0].innerText;
  let messageWords = lastMessageSent.split(":");
  let callsignMessage = messageWords[0];
  return callsignMessage.toLowerCase();
};

let callsigns = [];
let ids = [];
let idnumber = null
function splitToArray(){
  arr1.forEach(function(e){
    callsigns.push(e.callsign.toLowerCase());
    ids.push(e.acid);
  });
};
iteration1 = 0
function getUserID(){
  arr1 = [];
  callsigns = [];
  ids = [];
  convertUsers();
  splitToArray();
  iteration1 = 0
  callsigns.forEach(function(e){
    iteration1 = iteration1 + 1
    if (getCallsignOfLastMessage() === e){
      console.log("Callsign Match " + ids[iteration1]);
      idnumber = ids[iteration1];
      return ids[iteration1];
    }
    else{
      idnumber = null;
    }
  });
};

let lastMessageSent = document.querySelector("#geofs-ui-3dview > div.geofs-canvas-mouse-overlay > div.geofs-chat-messages.geofs-authenticated").children[0].innerText;
let lastMessageCheck = "none";
let messagesArray = [];



function checkMessage(){
 lastMessageCheck = document.querySelector("#geofs-ui-3dview > div.geofs-canvas-mouse-overlay > div.geofs-chat-messages.geofs-authenticated").children[0].innerText;
  if (lastMessageCheck != lastMessageSent){
    lastMessageSent = lastMessageCheck
    messagesArray.push(Date() + " " + lastMessageCheck + " " + "(User ID: " + getUserID() + ")")
  }
};

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function assignMessagesToList(){
  var iteration = 0
var arr = messagesArray;
var elem = document.getElementById("newDivId");
arr.forEach(function() {
  iteration = iteration + 1
  elem.innerHTML = (elem.innerHTML + " " + arr[iteration] + "\r\n")
})
}

function start(){
let messageInterval = setInterval(function(){
  checkMessage()
}, 200);
};



function save(){
  assignMessagesToList()
  download(newDiv.innerHTML, Date(), "txt");
  messagesArray = [];
  clearInterval(messageInterval)
  newDiv.innerHTML = ""
};

newDiv = document.createElement("div")
newDiv.id = "newDivId"
document.body.appendChild(newDiv)