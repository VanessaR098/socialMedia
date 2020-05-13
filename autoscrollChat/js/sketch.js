"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chat-username"; // name of folder you create in db
let messageInput;
let usernameInput;
let sendBtn;
let chatsLoaded = false;
let messageDiv;

function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  messageDiv = document.querySelector('#messageDiv');

  usernameInput = select('#usernameInput');
  messageInput = select('#messageInput');
  sendBtn = select('#sendBtn');

  sendBtn.mousePressed(sendMessage);




  let config = {
    apiKey: "AIzaSyC4aCq41x9dXfVML_--B_9RQNqu-0qZ01Y",
    authDomain: "socialmedia-84e44.firebaseapp.com",
    databaseURL: "https://socialmedia-84e44.firebaseio.com",
    projectId: "socialmedia-84e44",
    storageBucket: "socialmedia-84e44.appspot.com",
    messagingSenderId: "688670507048",
    appId: "1:688670507048:web:b697a7f4bca06ac08f751d"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}


function sendMessage(){

  if(usernameInput.value() !== '' && messageInput.value() !== ''){
    let timestamp = Date.now();
    let chatObject = {
      username: usernameInput.value(),
      message: messageInput.value(),
      timestamp: timestamp,
      // username,

    }
    createNode(folderName, timestamp, chatObject);
    messageInput.value('');
  }else{
    alert('type username and message first! >:c')
  }


}




function displayPastChats(){
  for (let i = 0; i < fbDataArray.length; i++) {

    let date = new Date(fbDataArray[i].timestamp);

    let p = createP(`${fbDataArray[i].username}: ${fbDataArray[i].message}`);
    // `${date.getMonth()} <br> ${fbDataArray[i].message}`
    p.parent('messageDiv');

  }
  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
  //scrollTop --> what point you're at in the scroll
}

function displayLastChat(){
  let index = fbDataArray.length-1;
  let p = createP(`${fbDataArray[index].username}: ${fbDataArray[index].message}`);
  p.parent('messageDiv');

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
  //scrollTop --> what point you're at in the scroll
}
