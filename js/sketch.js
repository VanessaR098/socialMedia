// Database URL: https://console.firebase.google.com/u/1/project/socialmedia-84e44/database/socialmedia-84e44/data

'use strict';

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv;

function setup() {
  noCanvas();

  // messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");




  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);


  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // paste your config file here
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

function sendMessage() {

  if (messageInput.value) { //check to make sure they typed something

    //first, assign timestamp for the messages
    //we sill use this both for message Id and include it in message obj itself
    // *** it may be redundant but helps when updating the message values
    let timestamp = Date.now(); //milliseconds since midnight of Jan 1, 1970 (beginning of time)

    //note: console functions on the global scope... therefore timestamp does not appear on console

    //first, create obj of messageData
    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp, //trailing , at the end is okay
      received: true,
    }

    //push to firebase!!
    createNode(folderName, timestamp, nodeData);

    console.log("sent message:");
    console.log(nodeData);

    createP(`sent message: ${nodeData.messageText}`);

    //zero out text area
    messageInput.value = '';

    //sned and receive Div variables are declared at the top and loaded as HTML elements in setup
    //toggles display...vanilla js DOM maniuplation of how to change the style, the css of an element in js
    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';





  } else {
    //alert if nothing is typed in the textarea
    alert("oi. whatchu doing. type a message first >:c");
  }
}

function receiveMessage() {
  for (var i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].received === false) {
      console.log("received message:");
      console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {recevied: true});

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';


      break;
    }else{
      receivedMessage.innerHTML = "no more messages out at sea";
      console.log("no more messages out at sea");
    }
  }
}

function sendAgain(){
  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}
