import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAX9o1qJTCwke-Z6lCdRhKPdsSyhbIcM3E",
    authDomain: "ketuker-c55a8.firebaseapp.com",
    databaseURL: "https://ketuker-c55a8.firebaseio.com",
    projectId: "ketuker-c55a8",
    storageBucket: "ketuker-c55a8.appspot.com",
    messagingSenderId: "62996493050",
    appId: "1:62996493050:web:542a6bc76eefa56317cf43",
    measurementId: "G-PVZ5SYLV11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
  //firebase.analytics();

  export  {
    storage, firebase as default
  }