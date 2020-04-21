// Database URL: https://console.firebase.google.com/u/1/project/socialmedia-84e44/database/socialmedia-84e44/data

'use strict';

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db


function setup() {
  noCanvas();

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
  ;
}
